# Architecture Design

## Database Tables

- Customer Table
- Console Table
- PC games Table
- Accessories Table
- Cart

## Views

- Log-In Page
- Sign-In Page
- Home Page
- Accessories Page
- Console Games Page
- PC games Page
- Shopping Cart
- Checkout

## Controllers

- User controller
- Product controller
- Cart controller
- Order controller
- Login/Register controller

## Url’s

- https://steamcommunity.com/dev
- https://aistudio.google.com/u/1/
- https://rawg.io/apidocs
- https://openai.com/api/

## Design Considerations
- Screens are swapped in memory via React Navigation rather than full page reloads, keeping the app responsive.
- All data is fetched asynchronously from the Django REST backend over HTTPS — no full-page refreshes.
- Redux manages global state (auth tokens, cart, user session) so components share data without prop-drilling.
- The backend is stateless — all auth is handled via JWT tokens stored securely in iOS Keychain / Android Keystore.
- Fewer direct object references between controllers reduces coupling and makes the codebase easier to maintain.
- Common use-cases to consider: a user browses games → adds to cart → checks out → receives order confirmation. Each step invokes ProductController → CartController → OrderController in sequence.


## Deliverables

1. Languages:
   - JavaScript / TypeScript — React Native frontend
   - Python — Django backend and AI integration

2. Frameworks: 
   - React Native — Cross-platform mobile UI (iOS & Android from a single codebase)
   - Django + Django REST Framework — Backend REST API, business logic, and database management

3. Libraries:
   - Redux / Context API — Global state management (cart, auth, user preferences)
   - Axios — HTTP client for REST API calls between app and backend
   - Hugging Face Transformers — Model loading and inference pipeline for AI features
   - Celery — Async task queue for email dispatch and AI inference jobs
   - Redis — Message broker backing Celery; also caches recommendations
   - SimpleJWT — JWT access + refresh token authentication for Django

4. Services/API’s:
Service and 	Purpose
  - Steam Web API: Game data, player stats, store information
  - RAWG Database API:	Game metadata, cover images, genres, tags
  - Google AI Studio API:	AI-powered features and model access
  - OpenAI API:	Natural language processing, chatbot support
  - Stripe / PayPal:	Payment processing and card tokenization
  - SendGrid:	Transactional and marketing email delivery
  - Azure Blob Storage:	Static assets and game image hosting

5. Package/Build Manager:
   Layer, Tool, Purpose
  - Mobile (React Native)	NPM / NPX	Manage JS/TS dependencies; Metro bundler
  - Backend (Python)	PIP + requirements.txt	Install Django, DRF, Celery, ML libraries
  - Mobile Build (iOS)	Xcode + CocoaPods	Native iOS build and signing
  - Mobile Build (Android)	Gradle	Native Android APK/AAB build
  - CI/CD	GitHub Actions	Automated test, lint, and Azure deploy pipeline


## Task Assignments

- Fazlul – MongoDB collections, Celery task queues, Redis caching, AI model integration, common queries. 
- Moh – React Native UI (home feed, search, profile), navigation setup, AI feature integration, documentation. 
- Joshua – Django REST API architecture, JWT auth, MongoDB schema, AI integration pipeline, CI/CD setup. 
- Fotios – React Native screens (game detail, checkout), RAWG API integration, database queries.
- Eitan - Stripe/PayPal payment flows, Google OAuth, recommendation engine, admin dashboard.

Embedded images: ?

Readability: ?

Deployment: 
  - Hosting: Microsoft Azure — Azure App Service (Linux) hosts the Django backend and      auto-scales based on load.
  - Static Assets: Azure Blob Storage serves game images and media via CDN.
  - Database: MongoDB Atlas (cloud cluster) connected to App Service over a private        VNet.
  - Cache / Queue: Azure Cache for Redis backs Celery and recommendation caching.
  - CI/CD Pipeline (GitHub Actions): Every push to main automatically runs tests           (pytest + Jest), lints code, builds a Docker image, pushes to Azure Container          Registry, deploys to App Service, and runs Django migrations.

Development/Deployment Environment: 
  - Aspect - Development - Production
  - Container - Docker Compose (local) - Azure Container Registry + App Service
  - Database - Local MongoDB (Docker) - MongoDB Atlas (cloud cluster)
  - Cache - Local Redis (Docker) - Azure Cache for Redis
  - Secrets - .env file	- Azure Key Vault
  - Debug Mode - Django DEBUG=True - DEBUG=False, gunicorn WSGI server
  - Mobile - Expo Go / Metro dev server - EAS Build (Expo Application Services)

Type of WebApp: 

GameStart is a native mobile application built with React Native, supporting both iOS and Android from a single codebase. It follows a Single Page Application (SPA) pattern within the mobile shell — screens are swapped in memory via React Navigation. Multi-page flows (e.g., checkout steps) are handled through nested navigation stacks rather than separate page loads.

Rest API: 

All endpoints return JSON. JWT authentication is required on all routes unless marked Public.

## Database Model

### User

| Field           | Type   | Description      |
|-----------------|--------|------------------|
| UserID          | int    | Primarily key    |
| Username        | String | User login name  |
| Role            | String | Access control   |
| Email           | String | Email address    |
| Password        | String | Security code    |
| Customer-Adress | String | Address deliver  |

### Products

| Field            | Type         | Description                |
|------------------|--------------|----------------------------|
| Consoles         | String       | PS5/XBOX etc..             |
| Games            | String       | Video Games                |
| Console-Joysticks| String       | Game Controllers           |
| Merchandise      | String       | Shirts, posters, etc..     |
| Product_Price    | Double/Float | Individual product prices  |

### Cart

| Field      | Type          | Description     |
|------------|---------------|-----------------|
| cartID     | int           | Primarily key   |
| UserID     | int,INT/String| Owner of cart   |
| Quantity   | Int           | Amount chose    |
| productID  | int,INT/String| product         |

### Orders

| Field        | Type     | Description      |
|--------------|----------|------------------|
| orderID      | int      | Primarily key    |
| userID       | int      | Buyer            |
| Price        | int/long | Cost             |
| Availability | Boolean  | Availability     |
| orderDate    | String   | Time of purchase |

Common Queries: ?
