# Prachi Trade

Prachi Trade is a Next.js-based web application for a building materials supplier in Odisha, India. It features a public-facing product catalog, enquiry system, and an admin portal for managing products, categories, subcategories, and analytics. The backend uses MongoDB via Mongoose for data storage and management.

---

## Table of Contents

-   [Overview](#overview)
-   [Features](#features)
-   [Project Structure](#project-structure)
-   [Data Models](#data-models)
-   [API Endpoints](#api-endpoints)
-   [Admin Portal](#admin-portal)
-   [Frontend Pages](#frontend-pages)
-   [Setup & Deployment](#setup--deployment)
-   [Company Info](#company-info)

---

## Overview

Prachi Trade provides a platform for users to browse building materials, submit enquiries, and for admins to manage inventory and view analytics. The application is built with Next.js, Tailwind CSS, and MongoDB.

---

## Features

-   Product catalog with categories and subcategories
-   Enquiry system for users
-   Admin portal for managing products, categories, subcategories, and viewing analytics
-   Visitor analytics dashboard
-   Authentication for admin users
-   Responsive UI with Tailwind CSS and Radix UI

---

## Project Structure

```
prachi-trade/
  ├── src/
  │   ├── app/                # Next.js app directory (pages, API routes)
  │   ├── components/         # React components (UI, admin, layout, etc.)
  │   ├── data/               # Static data (brands, navigation, products)
  │   ├── hooks/              # Custom React hooks
  │   ├── lib/                # Utility libraries (db connection, constants)
  │   └── models/             # Mongoose models (MongoDB schemas)
  ├── public/                 # Static assets (images, logos)
  ├── package.json            # Project dependencies and scripts
  └── README.md               # Project documentation
```

---

## Data Models

### Product

-   `name` (String, required)
-   `description` (String)
-   `image` (String, Cloudinary URL)
-   `brand` (String)
-   `price` (Number)
-   `unit` (String)
-   `subcategory` (ObjectId, ref: Subcategory, required)
-   `timestamps`

### Category

-   `name` (String, required, unique)
-   `subcategories` (Array of ObjectId, ref: Subcategory)
-   `timestamps`

### Subcategory

-   `name` (String, required)
-   `category` (ObjectId, ref: Category, required)
-   `products` (Array of ObjectId, ref: Product)
-   `timestamps`

### Enquiry

-   `name` (String, required)
-   `email` (String, required)
-   `mobile` (String, required)
-   `message` (String, required)
-   `product` (String, optional)
-   `timestamps`

### User

-   `username` (String, required, unique)
-   `email` (String, required, unique)
-   `password` (String, required, hashed)
-   `timestamps`

### Visit

-   `timestamp` (Date, default: now)
-   `userAgent` (String)
-   `ip` (String)
-   `timestamps`

---

## API Endpoints

### Products

-   `GET /api/products` — Returns all products or filters by subcategory.
-   `POST /api/products` — Creates a new product. Requires `name` and `subcategoryId`.

### Categories

-   `GET /api/categories` — Returns all categories with subcategories populated.
-   `POST /api/categories` — Creates a new category. Requires `name`.

### Subcategories

-   `GET /api/subcategories` — Returns all subcategories with products populated.
-   `POST /api/subcategories` — Creates a new subcategory. Requires `name` and `categoryId`.

### Enquiries

-   `GET /api/enquiries` — Returns all enquiries.
-   `POST /api/enquiries` — Creates a new enquiry. Requires `name`, `email`, `mobile`, `message`.

### Admin Authentication

-   `POST /api/admin/login` — Authenticates admin, returns JWT in cookie.
-   `POST /api/admin/register` — Registers a new admin user.
-   `POST /api/admin/logout` — Logs out admin by clearing the JWT cookie.

### Analytics

-   `GET /api/analytics/visits` — Returns visit statistics (daily, weekly, monthly, yearly).
-   `POST /api/track-visit` — Records a new site visit.

---

## Admin Portal

Accessible via `/admin/dashboard` and related routes.

**Features:**

-   Dashboard with summary cards and analytics charts
-   Manage products, categories, subcategories (CRUD)
-   View and manage user enquiries
-   Authentication required for access

---

## Frontend Pages

-   `/` – Home page with hero, mission, and brand sections
-   `/about` – Company overview and mission
-   `/contact` – Contact form for enquiries
-   `/category/[categoryId]` – View products by category
-   `/material/[subcategory]` – View products by subcategory
-   `/product/[productId]` – Product details
-   `/admin/*` – Admin portal (dashboard, products, categories, subcategories, enquiries)

---

## Setup & Deployment

### Development

```bash
npm install
npm run dev
```

### Production

```bash
npm run build
npm start
```

### Environment Variables

-   MongoDB connection string
-   JWT secret
-   Cloudinary credentials (for image uploads)

### Static Assets

Place images in `/public`.

---

## Company Info

-   **Name**: Prachi Trade
-   **Location**: Odisha, India
-   **Contact**: info@prachitrade.co.in

---

## Further Improvements

-   Add more detailed error handling and validation
-   Implement role-based access for admin features
-   Enhance analytics with more metrics
-   Add automated tests for API and UI
