# NEXUS — E-Commerce Store

A full-stack e-commerce application with Express.js backend and vanilla HTML/CSS/JS frontend.

## 🚀 Quick Start

### Prerequisites
- Node.js 16+ installed

### Installation

```bash
cd ecommerce
npm install
npm start
```

Then open: **http://localhost:3000**

---

## 📁 Project Structure

```
ecommerce/
├── server.js              # Express backend
├── package.json
├── data/
│   └── products.js        # Product catalog (8 products)
├── public/
│   ├── index.html         # Single-page app
│   ├── css/
│   │   └── style.css      # Dark luxury theme
│   └── js/
│       └── app.js         # Frontend logic
```

---

## 🛒 Features

### Product Listing
- Grid display of 8 products with emoji icons
- Filter by category (Electronics, Furniture, Wearables, Accessories)
- Search by product name or category
- Sort by price (asc/desc), rating, or name
- Product badges (Best Seller, New, Sale, Premium, Popular)

### Product Detail Page
- Full product description and features list
- Star ratings and review count
- Original vs sale price with savings indicator
- Quantity selector
- Stock availability

### Shopping Cart
- Add/remove items
- Adjust quantities
- Real-time price totals
- Free shipping on orders over $100
- 8% tax calculation
- Session-based cart persistence

### Order Processing
- Full checkout form (shipping + payment)
- Order validation
- Unique order ID generation
- Estimated delivery date
- Order confirmation page

---

## 🔌 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/products` | List products (filter/sort/search) |
| GET | `/api/products/:id` | Single product detail |
| GET | `/api/categories` | All categories |
| GET | `/api/cart` | Get cart with totals |
| POST | `/api/cart` | Add item to cart |
| PUT | `/api/cart/:productId` | Update item quantity |
| DELETE | `/api/cart/:productId` | Remove item |
| DELETE | `/api/cart` | Clear cart |
| POST | `/api/orders` | Place order |
| GET | `/api/orders/:id` | Get order by ID |

---

## ⚙️ Tech Stack

- **Backend**: Node.js + Express.js
- **Session**: express-session (in-memory)
- **Frontend**: Vanilla HTML/CSS/JavaScript
- **Fonts**: Syne (display) + DM Sans (body)
- **Data**: In-memory (no database required)

> **Note**: Data resets when the server restarts. For production, connect a database like PostgreSQL or MongoDB.
