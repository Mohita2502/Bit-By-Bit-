import os
import hmac
import hashlib
import bcrypt
from cryptography.fernet import Fernet
from pymongo import MongoClient
from typing import Optional
from dotenv import load_dotenv

load_dotenv(dotenv_path=os.path.join(os.path.dirname(__file__), "..", ".env"))

MONGO_URI  = os.getenv("MONGO_URI")
DB_NAME    = os.getenv("DB_NAME", "test")
USERS_COLL = os.getenv("USERS_COLL", "test")
FERNET_KEY = os.getenv("ENCRYPTION_KEY")

if not MONGO_URI or not FERNET_KEY:
    raise EnvironmentError("Missing MONGO_URI or ENCRYPTION_KEY in .env")

_fernet = Fernet(FERNET_KEY.encode())

def decrypt(token: str) -> str:
    return _fernet.decrypt(token.encode()).decode()

def _hmac_index(value: str) -> str:
    return hmac.new(FERNET_KEY.encode(), value.lower().encode(), hashlib.sha256).hexdigest()

def get_db_client(uri: str = None) -> MongoClient:
    return MongoClient(uri or MONGO_URI)

def find_user_by_email(email: str, client: Optional[MongoClient] = None) -> Optional[dict]:
    c    = client or get_db_client()
    coll = c[DB_NAME][USERS_COLL]
    # Search by HMAC index, not plaintext email
    return coll.find_one({"EmailIndex": _hmac_index(email.strip())})

def check_credentials(email: str, password: str, client: Optional[MongoClient] = None) -> bool:
    doc = find_user_by_email(email, client=client)
    if not doc:
        return False
    stored = doc.get("Password")
    if stored is None:
        return False
    # bcrypt.checkpw handles timing-safe comparison
    return bcrypt.checkpw(password.encode(), stored.encode())

def _demo():
    print("\nSimple Account Checker")
    email    = input("Email:    ").strip()
    password = input("Password: ")

    if check_credentials(email, password):
        print("✓ OK: credentials match")
    else:
        print("✗ FAIL: no match")

if __name__ == "__main__":
    while True:
        _demo()
        again = input("Try again? (y/n): ").lower().strip()
        if again != "y":
            break