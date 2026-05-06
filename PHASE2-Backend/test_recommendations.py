import requests
import json

# Sample cart items
cart_items = [
    {"id": 1, "name": "Elden Ring", "price": 59.99, "quantity": 1},
    {"id": 2, "name": "PlayStation 5 Controller", "price": 74.99, "quantity": 1}
]

payload = {"cartItems": cart_items}

print("📤 Sending recommendations request...")
print(f"Cart Items: {json.dumps(cart_items, indent=2)}\n")

try:
    response = requests.post(
        "http://localhost:8000/com.gamestart/v1/recommendations",
        json=payload,
        timeout=30
    )
    
    print(f"✅ Status Code: {response.status_code}")
    print(f"\n📥 Response:\n{json.dumps(response.json(), indent=2)}")
    
except Exception as e:
    print(f"❌ Error: {e}")
