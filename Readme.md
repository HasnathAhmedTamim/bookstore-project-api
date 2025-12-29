# Bookstore Sales Reporting System

## Overview
A full-stack web application for visualizing bookstore sales analytics and customer purchase data.

## Architecture

- **Backend:** Node.js + Express REST API (port 5000) connected to MySQL database
- **Frontend:** React + Vite with TailwindCSS for styling
- **Communication:** Axios for HTTP requests, CORS-enabled API

## How It Works

1. Express server exposes `/api/reports` endpoints
2. Controllers fetch data from MySQL via model layer
3. React components call API endpoints and display results
4. Four report types are rendered in a dashboard layout

## Key Features

- **Daily Sales Report** - Sales data filtered by specific date
- **Monthly Sales Report** - Aggregated monthly performance metrics
- **Best Selling Books** - Top-performing titles by sales volume
- **Customer Purchase History** - Individual customer transaction records

## Tech Stack

**Backend:**
- Express
- MySQL2
- CORS
- dotenv

**Frontend:**
- React 19
- Vite
- TailwindCSS
- Axios
- Puppeteer (likely for PDF generation)

**Architecture Pattern:**
- MVC pattern on backend with separation of routes/controllers/models

The application follows a clean separation of concerns with RESTful API design and component-based UI architecture.
