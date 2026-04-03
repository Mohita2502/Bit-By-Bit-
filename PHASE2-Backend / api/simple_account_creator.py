import os
import hmac
import hashlib
import bcrypt
from cryptography.fernet import Fernet
from pymongo import MongoClient
from typing import Optional
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))


# ── Config (all secrets from .env, never hardcoded) ──────────────────────────
MONGO_URI   = os.getenv("MONGO_URI")
DB_NAME     = os.getenv("DB_NAME", "test")
USERS_COLL  = os.getenv("USERS_COLL", "test")
FERNET_KEY  = os.getenv("ENCRYPTION_KEY")  # generate: python -c "from cryptography.fernet import Fernet; print(Fernet.generate_key().decode())"

if not MONGO_URI or not FERNET_KEY:
    raise EnvironmentError("Missing MONGO_URI or ENCRYPTION_KEY in .env")

_fernet = Fernet(FERNET_KEY.encode())

print(f"FERNET_KEY: {FERNET_KEY}")
print(f"_fernet: {_fernet}")

# ── Encryption helpers (reversible — used for email/name) ────────────────────
def encrypt(value: str) -> str:
    """AES encrypt a string, returns a url-safe base64 token."""
    return _fernet.encrypt(value.encode()).decode()

def decrypt(token: str) -> str:
    """Decrypt an AES-encrypted token back to plaintext."""
    return _fernet.decrypt(token.encode()).decode()

# ── Deterministic HMAC for lookups (lets us search encrypted email) ──────────
def _hmac_index(value: str) -> str:
    """Create a consistent searchable index without exposing the value."""
    return hmac.new(FERNET_KEY.encode(), value.lower().encode(), hashlib.sha256).hexdigest()

# ── DB client ────────────────────────────────────────────────────────────────
def get_db_client(uri: str = None) -> MongoClient:
    return MongoClient(uri or MONGO_URI)

# ── Account creation ─────────────────────────────────────────────────────────
def create_account(
    first: str, last: str, email: str, password: str,
    client: Optional[MongoClient] = None
) -> dict:
    c    = client or get_db_client()
    coll = c[DB_NAME][USERS_COLL]

    email_clean = email.strip().lower()

    # Search via HMAC index — never decrypt every row to find a match
    existing = coll.find_one({"EmailIndex": _hmac_index(email_clean)})
    if existing:
        return {"created": False, "error": "Email already exists"}

    # Hash password with bcrypt (auto-salted, one-way)
    hashed_pw = bcrypt.hashpw(password.encode(), bcrypt.gensalt(rounds=12))

    doc = {
        "FirstName":  encrypt(first.strip()),
        "LastName":   encrypt(last.strip()),
        "Email":      encrypt(email_clean),      # encrypted at rest
        "EmailIndex": _hmac_index(email_clean),  # searchable, non-reversible
        "Password":   hashed_pw.decode(),        # bcrypt hash, never plaintext
    }

    try:
        coll.insert_one(doc)
        return {"created": True}
    except Exception as e:
        return {"created": False, "error": str(e)}

# ── Login / password verification ────────────────────────────────────────────
def login(email: str, password: str, client: Optional[MongoClient] = None) -> dict:
    c    = client or get_db_client()
    coll = c[DB_NAME][USERS_COLL]

    email_clean = email.strip().lower()
    user = coll.find_one({"EmailIndex": _hmac_index(email_clean)})

    if not user:
        return {"authenticated": False, "error": "Invalid credentials"}

    password_matches = bcrypt.checkpw(password.encode(), user["Password"].encode())

    if not password_matches:
        return {"authenticated": False, "error": "Invalid credentials"}

    return {
        "authenticated": True,
        "first": decrypt(user["FirstName"]),
        "last":  decrypt(user["LastName"]),
        "email": decrypt(user["Email"]),
    }

# ── Demo ─────────────────────────────────────────────────────────────────────
def _demo():
    print("\n--- Account Creator ---")
    first    = input("First Name: ").strip()
    last     = input("Last Name:  ").strip()
    email    = input("Email:      ").strip()
    password = input("Password:   ").strip()

    result = create_account(first, last, email, password)
    if result.get("created"):
        print(f"✓ Account created for {email}")
    else:
        print(f"✗ Failed: {result.get('error')}")

if __name__ == "__main__":
    while True:
        _demo()
        again = input("\nCreate another? (y/n): ").lower().strip()
        if again != "y":
            break