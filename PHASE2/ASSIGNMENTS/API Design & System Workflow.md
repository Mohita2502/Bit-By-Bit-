# BitByBit API Design & System Workflow

**Project:** E-Commerce Gaming Application

---

## 1. API List

### API 1: Login User
- **Method:** POST
- **Input:** `email`, `password`
- **Output:** `success` / `error`
- **Module:** User
- **Table:** User

---

### API 2: Search Products
- **Method:** GET
- **Input:** `keyword`
- **Output:** List of products
- **Module:** Product
- **Table:** Product

---

### API 3: Submit Order
- **Method:** POST
- **Input:** `student_id`, `product_id`
- **Output:** `success` / `due date`
- **Module:** Order
- **Table:** Order

---

### API 4: Order Confirmation Sent to Email
- **Method:** POST
- **Input:** `student_id`, `order_id`
- **Output:** `success` / `due date`
- **Module:** Order
- **Table:** Order

---

### API 5: Cancel Order
- **Method:** PUT
- **Input:** `user_id`, `order_id`
- **Output:** Success message
- **Module:** Order
- **Table:** Order

---

### API 6: Use Groq AI Chatbot
- **Method:** GET
- **Input:** `prompt`
- **Output:** Response displayed on Chatbot
- **Module:** User, Order
- **Table:** User, Order

---

## 2. API Grouping by Module

| Module | APIs |
|---|---|
| **User Module** | Login User |
| **Product Module** | Search Products |
| **Order Module** | Submit Order, Cancel Order, Order Confirmation |
| **AI Module** | Use AI Chatbot |

---

## 3. System Workflow Example

**Feature: Submit an Order**

1. Student logs in
2. Student searches for a product
3. Student clicks **Add to Cart**
4. Products are sent to the Cart page
5. User clicks **Checkout** and fills in payment info
6. User clicks **Submit Order**
7. UI sends `POST /submitOrder`
8. Database creates the order
9. System returns order confirmation

---

## 4. AI Integration

**Endpoint:** `GET /chatbot`

| Field | Details |
|---|---|
| **Input** | Student prompt |
| **Output** | Answer to prompt |
| **Display** | Rendered on the Chatbot UI |

---

## 5. Error Handling

| Scenario | Response |
|---|---|
| Wrong login credentials | Return error message |
| Order confirmation not sent to email | Return network error message |
| Missing input fields | Return validation error |

---

## 6. Summary

This system uses a RESTful API architecture to connect the UI with the backend and database. It also integrates a Groq AI chatbot to enhance the overall user experience.
