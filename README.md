# BitbyBitPhase2

Full-stack project with a mobile/web frontend (Expo + React Native) and a backend API (Django + MongoDB tooling).

## Project Structure

- `Frontend/GameStart` - Expo application (`expo-router`, React Native)
- `backend` - Django backend API and database configuration

## AI (Grok) & recommendations

- **Grok (xAI)** - The roadmap includes a **Grok**-powered assistant for gaming Q&A, product help, and richer personalization. End-to-end integration with the Grok API is **not finished yet** and is scheduled for a near-term milestone.
- **AI recommendations (in development)** - The in-app chat calls the Django route `POST /com.gamestart/v1/ai/recommendation` with a JSON body such as `{ "query": "…", "model": "…" }` (optional model). The Expo chat UI lives in `Frontend/GameStart/components/ChatWidget.tsx`. While Grok is being wired up, local development uses **Groq** for completions: set `GROQ_API_KEY` in `backend/.env` (see `backend/api/views.py`). You can list models from `GET /com.gamestart/v1/ai/models`.

## Email API

- **Order confirmation email** - The backend is structured to send confirmation mail after checkout via `POST /com.gamestart/v1/orders/submit` and the helper in `backend/api/email_service.py`. A simple test handler exists at `GET /com.gamestart/v1/test/email?recipient=user@example.com`.
- **Not production-ready yet** - SMTP-related settings (`EMAIL_*`, `DEFAULT_FROM_EMAIL`) are driven by environment variables in `backend/GameStart_B/settings.py`, but **provider credentials, deliverability, and final order-email flows are still being finalized** and will ship soon.

## Azure, data, and deployment

- **Microsoft Azure (App Service)** - The backend is hosted or targeted for **Azure App Service** (Linux). The app’s CORS configuration includes `https://gamestart-backend.azurewebsites.net` in `backend/GameStart_B/settings.py`. The frontend’s auth and some API calls use that same base URL in `Frontend/GameStart/APICalls/` (for example `callProfileAPI.ts` and `orderAPI.ts`). For local-only development, point calls at `http://127.0.0.1:8000` where needed (the in-app AI chat in `ChatWidget.tsx` still defaults to localhost for the recommendation endpoint).
- **Production process model** - `backend/Procfile` runs the API with **Gunicorn** (`gunicorn GameStart_B.wsgi`), which is typical for App Service and similar PaaS hosts. `requirements.txt` includes `gunicorn`.
- **MongoDB Atlas** - Account and order helpers connect via **`MONGO_URI`** (and related vars such as **`MONGO_DB`**, **`MONGO_USERS_COLL`**). See **`backend/MONGODB_ATLAS.md`** for Atlas setup, IP allowlists, and `.env` examples. Do not commit database credentials.
- **Cross-origin API access** - **`django-cors-headers`** is enabled with development-friendly settings; tighten **`CORS_ALLOWED_ORIGINS`** before production if you stop using `CORS_ALLOW_ALL_ORIGINS`.
- **Secrets and configuration** - Use **`backend/.env`** for local development (loaded when `DEBUG` is true). On Azure, configure the same variables (**`GROQ_API_KEY`**, **`MONGO_*`**, **`EMAIL_*`**, Django `SECRET_KEY`, etc.) in **App Service → Configuration** or **Key Vault**, not in source control.

## Prerequisites

- Node.js and npm
- Python 3.10+ (recommended)
- Expo CLI available through `npx`
- MongoDB connection (if running Mongo-backed features)

## Quick Start

### 1) Clone and install frontend dependencies

```bash
cd Frontend/GameStart
npm install
```

### 2) Install backend dependencies

```bash
cd ../../backend
python -m venv env
source env/bin/activate
pip install -r requirements.txt
```

On Windows (PowerShell), activate the environment with:

```powershell
.\env\Scripts\Activate.ps1
```

## Run the App

### Frontend (Expo)

From `Frontend/GameStart`:

```bash
npx expo start
```

Common alternatives:

```bash
npm run android
npm run ios
npm run web
```

### Backend (Django)

From `backend` (with virtual environment activated):

```bash
python manage.py runserver
```

Default backend URL: `http://127.0.0.1:8000/`

## Notes

- Frontend README is available at `Frontend/GameStart/README.md`.
- Backend dependencies are listed in `backend/requirements.txt`.
- Design and architecture notes (including broader cloud ideas such as Redis caching, CI/CD, or additional Azure services) live under `ASSIGNMENT/`; treat them as documentation and planning, not necessarily as implemented features in this repo.
- If environment variables are required for API/database access, create and configure your local `.env` file before running (`backend/.env` is loaded when `DEBUG` is true). For AI chat during development, add `GROQ_API_KEY`. For email when it is enabled, add the `EMAIL_*` variables expected by Django.
