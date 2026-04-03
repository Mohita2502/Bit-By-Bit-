# BitByBit — Product Requirements Document

**Team:** Fazlul F, Eitan A, Joshua D, Fotios B, Moh P

---

## 1. Introduction & Overview

### 1.1 Problem Statement

Gamers lack a centralized, intelligent platform dedicated exclusively to video games, consoles, and accessories. Existing e-commerce platforms:

- Are overly broad and not gamer-focused
- Lack advanced personalization
- Do not integrate intelligent support systems
- Do not leverage AI for engagement and retention

> The market opportunity is a focused, AI-enhanced gaming marketplace.

### 1.2 Proposed Solution

BitByBit is an e-commerce application dedicated to gamers. It allows users to:

- Browse games, consoles, and accessories
- Search by platform (e.g., PlayStation, Nintendo Switch)
- Add products to a cart with instant pop-out preview
- Checkout after logging in or registering
- Use a smart chatbot (powered by LangChain + RAWG API) for personalized recommendations, live player stats, and ratings

### 1.3 Target Audience

**Primary:**
- Casual Gamers
- Hardcore Gaming Enthusiasts

**Secondary:**
- Parents or gift buyers seeking games or accessories with minimal effort

---

## 2. Technology Stack

| Layer | Technology |
|---|---|
| **Frontend** | React / React Native |
| **Backend** | Python Django (REST APIs) |
| **Database** | MongoDB (NoSQL) |
| **Infrastructure** | AWS or Azure, MongoDB Atlas, Redis, Celery |

### AI Models (Open-Source)

| Model | Use Case |
|---|---|
| DistilBERT | Sentiment & behavioral modeling |
| Mistral-7B-Instruct | Conversational chatbot |
| Flan-T5-Large | Email personalization |

> All models are free and open-source to eliminate recurring API costs.

---

## 3. Goals & Success Metrics

### 3.1 Project Goals

- **Usability Goal:** All users should be able to search for a game and add it to the cart in under 30 seconds (AI-assisted)
- **Business Goal:** Establish BitByBit as a go-to platform for gaming products and achieve high engagement through chatbot recommendations

### 3.2 Success Metrics / KPIs *(For Future)*

| Metric | Target |
|---|---|
| Daily Active Users (DAU) | 500+ within first month of beta |
| Cart Conversion Rate | 30% of users who add items proceed to checkout |
| User Satisfaction | 4.5+ rating in app usability surveys |

### 3.3 AI Performance Goals

- Measurable lift in engagement and revenue
- Reduced operational support costs
- Increased retention via personalization

---

## 4. Feature Requirements

### Infrastructure & Integration Requirements

- Google OAuth 2.0 authentication
- Secure payment integration
- Order management and tracking
- Refund workflow
- Cloud deployment (AWS/Azure)
- Redis caching
- Celery background task processing
- AI-powered personalization systems

### ✅ Required Features (Core MVP)

- Homepage navigation (Games, Consoles, Accessories)
- Login / Registration
- Chat with AI to get best and latest games
- Product search (name, category) with AI search
- Add to cart (pop-out view with clear/remove options)
- Checkout via Stripe
- AI-powered personalization systems

### 🔵 Desired Features (Improves Usability & Appearance)

- Enhanced search filters (price range, genre, release date)
- Clean and responsive UI design (mobile-first)
- Cart saved across sessions
- Sorting options (by popularity, rating, or price)
- Simple "Recommended for You" section powered by LLM trending data

### ⭐ Aspirational Features (Differentiators)

- Smart chatbot (Groq) with live stats, reviews, and recommendations
- Personalized recommendations based on browsing/purchase history
- Wishlist / Favorites
- Gamified loyalty points system for frequent buyers

---

## 5. Out of Scope

- Offline app mode
- Multi-language support *(planned for future versions)*

---

## 6. Open Questions

- What is the monetization model? *(Direct sales only, or commission from third-party sellers?)*
