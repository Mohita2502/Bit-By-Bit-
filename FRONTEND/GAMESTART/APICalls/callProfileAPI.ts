const BACKEND_URL = "http://localhost:8000/com.gamestart/v1/home/userauthentication/login/";

export async function loginWithEmailPassword(email: string, password: string) {
  const res = await fetch(`${BACKEND_URL}~${email}~${password}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",   // tell backend body is JSON
    },
    body: JSON.stringify({ email, password }), // JSON you send to Python
  });

  if (!res.ok) {
    // try to read error message from backend
    let message = "Login failed";
    try {
      const data = await res.json();
      message = data.detail || data.message || message;
    } catch {
      // ignore JSON parse errors
    }
    throw new Error(message);
  }

  const data = await res.json(); // what Python returns (e.g. { token, email })
  return data;
}

// NEW — Register API
export async function registerNewUser(
  firstName: string,
  lastName: string,
  email: string,
  password: string
) {
  const res = await fetch(`${BACKEND_URL}/userauthentication/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ firstName, lastName, email, password }),
  });

  if (!res.ok) {
    let msg = "Registration failed";
    try {
      const data = await res.json();
      msg = data.detail || data.message || msg;
    } catch {}
    throw new Error(msg);
  }

  return res.json();
}
