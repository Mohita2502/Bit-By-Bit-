# E-Commerce Gaming Application
**By: BitByBit**

---

## 1. Modules & Responsibilities

| Module | Functionality | Database Table |
|--------|---------------|-----------------|
| **User Module** | Register, Login | User |
| **Product Module** | Add, Search Products | Product |
| **Order Module** | Submit, Cancel Orders | Order |
| **AI Module** | AI Chatbot Queries | User, Order |

---

## 2. UI Screens

- **Login Page**
  - Email input field
  - Password input field
  - Login button

- **Homepage**
  - Search bar
  - Category list

- **Product List**
  - Product table display
  - Add to cart button

- **Cart Page**
  - OrderItem table
  - List of ordered products

- **Checkout Page**
  - Order table reference
  - User information form
  - Credit card information form

- **Order Page**
  - Order table display
  - User order history

---

## 3. Navigation Flow

```
Login
  ↓
Search Page
  ↓
Product List
  ↓
Add to Cart
  ↓
Checkout Page
  ↓
Order Confirmation (sent to email)
  ↓
Order Posted in Order Page
```

---

## 4. AI Feature

**Feature:** AI Chatbot

| Component | Details |
|-----------|---------|
| **Input** | User prompt |
| **Output** | AI-generated response based on user prompt |
| **UI Location** | Chatbot interface |

---

## 5. Mapping (UI → API → Database)

| UI Action | API Endpoint | Database Table |
|-----------|--------------|-----------------|
| Login | `POST /login` | User |
| Search Products | `GET /products` | Product |
| Order Products | `POST /borrow` | Order |
| View Orders | `GET /orders` | Order |
| AI Chatbot | `GET /grokAIchatbot` | Grok API |

---

## 6. System Comparison: GameStop

### Current GameStop System
- Basic search functionality
- Standard order system
- Limited customer assistance

### Our System (BitByBit Advantages)
- ✅ **AI Chatbot Integration** - Real-time customer assistance
- ✅ **User-Friendly UI** - Simplified and intuitive interface
- ✅ **Intelligent Product Discovery** - AI-powered recommendations and support