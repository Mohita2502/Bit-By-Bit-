import os
from pymongo import MongoClient
from typing import Optional

# Match what you actually have in Compass:
MONGO_URI = "mongodb://localhost:27017"  # change if your URI is different
DB_NAME = "admin"        # you are using the admin database
ORDERS_COLL = "orders"   # your collection for orders is called "orders"

def get_db_client(uri: str = None) -> MongoClient:
    uri = uri or MONGO_URI
    return MongoClient(uri)
def create_order(order_id: number, items: list[str], quantities: list[int], prices: list[float],
                 client: Optional[MongoClient] = None) -> dict:
    """
    Create a new order in MongoDB with Item, Quantity, Price fields.
    Returns {created: True} or {created: False, error: "..."}.
    """

    c = client or get_db_client()
    coll = c[DB_NAME][ORDERS_COLL]

    # Document structure EXACTLY how you want it
    doc = {
        "Items": [item.strip() for item in items],
        "itemQuantity": quantities,
        "totalPrice": prices
    }
    # GOES INTO ORders collection
    try:
        coll.insert_one(doc)
        return {"created": True}
    except Exception as e:
        return {"created": False, "error": str(e)}

def _demo():
    print("Simple Order Creator (MongoDB write test)")

    items = []
    quantities = []
    prices = []

    # loop to allow multiple orders
    while True:
        item = input("Item Name: ").strip()
        quantity = int(input("Quantity: ").strip())
        price = float(input("Price: ").strip())

        items.append(item)
        quantities.append(quantity)
        prices.append(price)
        result = create_order(items, quantities, prices)

        if result.get("created"):
            print(f"OK: order created for {item}")
        else:
            print(f"FAIL: {result.get('error')}")
        again = input("Create another? (y/n): ").lower().strip()
        if again != "y":
            break
            
if __name__ == "__main__":
    _demo()


    