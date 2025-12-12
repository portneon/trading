# Crypto/Stock Trading Simulator

A real-time trading simulator that visualizes market data and allows users to paper trade (simulate buy/sell) assets. Built with Next.js and Express, integrating with the Finnhub API for market data.

## Features

-   **Real-time Chart**: Live updating candlestick/line chart.
    -   Includes Zoom and Pan functionality (`chartjs-plugin-zoom`).
    -   Configurable timeframes and visual feedback.
-   **Paper Trading**:
    -   Buy and Sell functionality with a virtual wallet.
    -   Portfolio tracking (Holdings, Balance).
    -   Transaction history.
-   **Market Data**:
    -   Integration with Finnhub API for real-world data.
    -   Fallback simulation engine when API limits are reached.
-   **Modern UI**:
    -   Responsive Dashboard.
    -   Dark/Light mode support (via Tailwind CSS).

## Tech Stack

-   **Frontend**: Next.js 15, React 19, Tailwind CSS 4.
-   **Charting**: Chart.js, react-chartjs-2.
-   **Backend**: Node.js, Express.
-   **Data Provider**: Finnhub.

## Prerequisites

-   Node.js (v18+ recommended)
-   npm or yarn
-   A Finnhub API Key (Get one for free at [finnhub.io](https://finnhub.io/))

## Setup & Installation

### 1. Backend Setup

The backend handles API proxying to Finnhub to protect API keys and manage rate limits.

1.  Navigate to the backend directory:
    ```bash
    cd backend
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Configure Environment Variables:
    Create a `.env` file in the `backend/` directory:
    ```env
    PORT=8080
    NEXT_PUBLIC_FINNHUB_API_KEY=your_finnhub_api_key_here
    ```
4.  Start the backend server:
    ```bash
    npm start
    ```
    The server will run on `http://localhost:8080`.

### 2. Frontend Setup

1.  Navigate to the project root:
    ```bash
    cd ..
    ```
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Start the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) to view the app.

## Project Structure

-   `src/components`: React components (Chart, Dashboard, etc.).
-   `src/context`: React Context for state management (TradingContext).
-   `src/lib`: Utilities and API clients (data-feed, api wrappers).
-   `backend/`: Express server and services.

## Usage

1.  **Start Feed**: Click the "Start Feed" button to begin receiving live updates.
2.  **Trade**: Use the "Trade" box to buy or sell assets based on the current price.
3.  **Zoom**: Mouse wheel to zoom in/out of the chart, drag to pan.
