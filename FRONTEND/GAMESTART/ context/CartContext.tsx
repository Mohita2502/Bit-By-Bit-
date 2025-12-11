// src/context/CartContext.tsx
import React, {createContext,useContext,useReducer,ReactNode,} from "react";

// the item 
export type CartItem = {
  id: number;         // same as StoreItem.id
  name: string;
  price: number;
  image: any;         // string URL 
  quantity: number;
};

// The state of the Cart
// Represents the current items in the cart
type CartState = {
  items: CartItem[];
};

// Cart actions for reducer 
type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: number } }
  | { type: "SET_QUANTITY"; payload: { id: number; quantity: number } }
  | { type: "CLEAR_CART" };

// The Operations with its for the Cart using the Cart Context
  type CartContextType = {
  items: CartItem[];
  addToCart: (item: { id: number; name: string; price: number; image: any }) => void;
  removeFromCart: (id: number) => void;
  setQuantity: (id: number, quantity: number) => void;
  clearCart: () => void;
};

// 
const CartContext = createContext<CartContextType | null>(null);

// The intial start of the Cart with no items
const initialState: CartState = { items: [] };

// The reducer function to handle cart actions
// Passes the CartState which is the current state of the cart
// Passes the CartAction as the operations system 
function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(i => i.id === action.payload.id);
      if (existing) {
        return {
          ...state,
          items: state.items.map(i =>
            i.id === action.payload.id
              ? { ...i, quantity: i.quantity + action.payload.quantity }
              : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter(i => i.id !== action.payload.id),
      };
    case "SET_QUANTITY":
      return {
        ...state,
        items: state.items.map(i =>
          i.id === action.payload.id
            ? { ...i, quantity: action.payload.quantity }
            : i
        ),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    default:
      return state;
  }
}

// Manages the cart state and provides cart operations to children components
export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  const addToCart: CartContextType["addToCart"] = item => {
    dispatch({
      type: "ADD_ITEM",
      payload: { ...item, quantity: 1 },
    });
  };

  const removeFromCart = (id: number) =>
    dispatch({ type: "REMOVE_ITEM", payload: { id } });

  const setQuantity = (id: number, quantity: number) =>
    dispatch({ type: "SET_QUANTITY", payload: { id, quantity } });

  const clearCart = () => dispatch({ type: "CLEAR_CART" });

  return (
    <CartContext.Provider
      value={{ items: state.items, addToCart, removeFromCart, setQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used inside a CartProvider");
  }
  return ctx;
}
