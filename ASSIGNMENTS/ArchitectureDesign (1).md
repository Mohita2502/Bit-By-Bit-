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

## Deliverables

1. Languages: JavaScript, TypeScript, Python
2. Frameworks: Django, React Native
3. Libraries:
4. Services/API’s: Steam WEB API, RAWG Database API, GOOGLE STUDIO AI API, OPEN AI API
5. Package/Build Manager: NPX, NPM, PIP (Python package manager)

## Task Assignments

- Fazlul – Backend, Database
- Moh – Frontend, AI
- Joshua – Team leader, back-end, some Database
- Fotios – Frontend, some Database
- Eitan - Frontend, some Backend

Embedded images: ?

Readability: ?

Deployment: ?

Development/Deployment Environment: ?

Type of WebApp: Single Page Application, Possibility of Multi-pages as well.

Rest API: TBD?

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
