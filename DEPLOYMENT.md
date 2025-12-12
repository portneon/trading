# Deployment Guide

This application consists of two parts:
1.  **Frontend**: Next.js (Client-side & Server components)
2.  **Backend**: Node.js/Express (API Proxy)

You will likely need to deploy them as separate services, or use a platform that supports monorepos.

## Option 1: Vercel (Frontend) + Render/Railway (Backend) - Recommended

### 1. Backend Deployment (Render/Railway/Heroku)

The backend needs to run permanently to serve API requests.

**Steps for Render.com:**
1.  Connect your GitHub repository to Render.
2.  Create a new **Web Service**.
3.  **Root Directory**: Set to `backend`.
4.  **Build Command**: `npm install`
5.  **Start Command**: `node server.js`
6.  **Environment Variables**:
    -   `NEXT_PUBLIC_FINNHUB_API_KEY`: Your Finnhub API Key.
    -   `PORT`: `8080` (or let Render assign one, usually accessible via `PORT` env var).
7.  **Deploy**. Note the URL provided (e.g., `https://trading-backend.onrender.com`).

### 2. Frontend Deployment (Vercel)

1.  Push your code to GitHub.
2.  Go to [Vercel](https://vercel.com) and "Import Project".
3.  Select your repository.
4.  **Framework Preset**: Next.js (should detect automatically).
5.  **Root Directory**: `./` (default).
6.  **Environment Variables**:
    -   You need to point the frontend to your production backend.
    -   Currently, the frontend API URL is hardcoded in `src/lib/api.js` as `http://localhost:8080/api`.
    -   **ACTION REQUIRED**: You must update `src/lib/api.js` to use an environment variable (e.g., `NEXT_PUBLIC_BACKEND_URL`) before deploying.
    
    *Update `src/lib/api.js`:*
    ```javascript
    const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:8080/api';
    ```
    
    Then in Vercel, set:
    -   `NEXT_PUBLIC_BACKEND_URL`: `https://trading-backend.onrender.com/api` (The URL from Step 1).
7.  **Deploy**.

## Option 2: Docker (Self-hosted / VPS)

You can containerize both applications.

### Backend Dockerfile (`backend/Dockerfile`)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install --production
COPY . .
EXPOSE 8080
CMD ["node", "server.js"]
```

### Frontend Dockerfile (`Dockerfile`)
```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Important Notes

-   **CORS**: Ensure your backend's `cors` configuration allows requests from your production frontend domain.
-   **Security**: Never commit `.env` files. Always set secrets in the deployment platform's dashboard.
