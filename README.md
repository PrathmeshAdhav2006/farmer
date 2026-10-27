# Farmer Marketplace

A modern **agricultural e-commerce platform** connecting farmers directly with buyers in Maharashtra, India. Built with a React frontend, Node.js/Express backend, and MongoDB database to empower farmers with direct market access, fair pricing, and transparency.

---

## Tech Stack

### Frontend
- **React 18** with **Vite 5** (build tool)
- **Tailwind CSS 3** with dark mode and custom farmer-themed palette
- **shadcn/ui** components built on **Radix UI** primitives
- **Framer Motion** & **Aceternity UI** for animations
- **React Router v6** (nested routes, role-based access)
- **TanStack React Query v5** (server state management)
- **React Context API** (AuthContext, CartContext)
- **Axios** with token interceptors
- **React Hook Form + Zod** (form validation)
- **Recharts** (analytics & mandi price charts)
- **React Leaflet** (interactive farm map)
- **Socket.io Client** (real-time chat & notifications)
- **Three.js** (3D visuals)

### Backend
- **Node.js + Express 4** (ES Modules)
- **MongoDB + Mongoose 8** (ODM)
- **JWT** authentication (JSON Web Tokens)
- **Socket.io** (real-time communication)
- **Razorpay** payment gateway
- **Nodemailer** (email service with HTML templates)
- **Multer** (file uploads), **Cloudinary** (cloud storage)
- **Helmet, CORS, Rate Limiting, Mongo Sanitize** (security)

---

## Features

### For Farmers
- **Product Management**: List, edit, and manage crop inventory with categories, grades, and images
- **Order Management**: View, confirm, ship, and manage incoming orders
- **Sales Analytics**: Visual dashboards with revenue trends and performance metrics
- **APMC Market Prices**: Real-time mandi price data and 30-day historical trends for Maharashtra districts
- **Community Group-Buy Deals**: Create bulk discount deals for social commerce
- **Digital Product Passport**: Auto-generated crop traceability including farm location, harvest date, quality inspection, and eco-sustainability metrics
- **Direct Buyer Chat**: Real-time messaging with potential buyers

### For Buyers
- **Browse Products**: Search and filter fresh produce by category, district, price, and quality grade
- **Shopping Cart**: Add items, manage quantities, checkout with online payment or COD
- **Order Tracking**: Real-time order status updates and notifications
- **Community Deals**: Join group-buying deals for wholesale discounts
- **Direct Farmer Communication**: Chat directly with farmers to ask questions and negotiate
- **Farm Map**: Explore farm locations on an interactive map
- **Digital Product Passport**: View complete product origin, harvest dates, and eco-impact metrics
- **Order History**: Track past purchases and manage delivery addresses

### For Admins
- **Dashboard Analytics**: Platform-wide metrics (users, orders, revenue)
- **User Management**: Verify farmer profiles, manage user accounts
- **Product Moderation**: Approve/reject product listings
- **APMC Data Management**: Import and manage market price data
- **Platform Oversight**: Monitor all orders and system activity

### Platform Features
- **Role-Based Access Control**: Buyer, Farmer, and Admin tiers enforced via middleware
- **Real-Time Notifications**: Socket.io-powered in-app alerts
- **Email Notifications**: Order confirmations, password reset, and deal alerts
- **Secure Payments**: Razorpay integration with escrow support (orders > ₹5000) and Cash on Delivery (COD)
- **Responsive Design**: Mobile-friendly with clean dark mode theme

---

## Project Structure

```
farmer/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/              # MainLayout, Navbar, Footer, DashboardLayout, AdminLayout
│   │   │   ├── auth/                # FarmerSignupForm, BuyerSignupForm
│   │   │   ├── landing/             # Hero, Features, HowItWorks, Stats, FeaturedProducts
│   │   │   ├── product/             # DigitalPassport
│   │   │   ├── shared/              # PrivateRoute, Loading
│   │   │   ├── ui/                  # shadcn/ui components (button, card, dialog, etc.)
│   │   │   └── aceternity/          # Animated UI components
│   │   ├── pages/
│   │   │   ├── public/              # Home, Products, ProductDetail, CommunityDeals
│   │   │   ├── auth/                # Login, Register, ForgotPassword
│   │   │   ├── buyer/               # Cart, Checkout, MyOrders, Profile, Settings, FarmMap
│   │   │   ├── farmer/              # Dashboard, Products, Orders, Analytics, MarketPrices, Deals, etc.
│   │   │   ├── admin/               # Dashboard, Users, Products, Orders, APMC, Settings
│   │   │   └── shared/              # Notifications, Messages
│   │   ├── context/                 # AuthContext, CartContext
│   │   ├── services/                # auth, user, order, payment API services
│   │   ├── config/                  # Axios instance with interceptors
│   │   ├── lib/                     # Utility functions
│   │   └── constants/               # Location data (Maharashtra districts)
│   ├── vite.config.js
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── app.js                   # Express configuration & middleware
│   │   ├── config/                  # db.js, razorpay.js, cloudinary.js
│   │   ├── models/                  # User, Product, Order, Review, Notification, Message, ChatRoom, GroupBuy, APMCPrice
│   │   ├── routes/                  # auth, product, cart, order, payment, user, admin, apmc, notification, groupBuy, chat
│   │   ├── controllers/             # Business logic for each route
│   │   ├── middleware/              # auth, error, upload, validate
│   │   ├── services/                # email, notification, SMS
│   │   ├── utils/                   # apiError, apiResponse, asyncHandler, validators
│   │   └── data/                    # crops.json, districts.json (Maharashtra)
│   ├── scripts/                     # seedData.js, seedFarmers.js
│   ├── server.js                    # Entry point
│   └── package.json
└── README.md
```

---

## API Endpoints

| Endpoint Group | Key Routes | Access |
|---|---|---|
| `/api/auth` | register, login, logout, me | Public + Protected |
| `/api/products` | CRUD, search, categories, autocomplete, sustainability-stats | Public + Farmer/Admin |
| `/api/cart` | get, add, update, remove, clear | Buyer only |
| `/api/orders` | create, my-orders, farmer orders, status, cancel, release-escrow | Protected (role-based) |
| `/api/payment` | create-order, verify, refund, webhook | Protected + Webhook |
| `/api/users` | profile, addresses, farmer stats/analytics, admin user management | Protected |
| `/api/admin` | stats, users, manage users | Admin only |
| `/api/apmc` | district prices, commodity history, import | Public + Admin |
| `/api/notifications` | get, mark-read, delete | Protected |
| `/api/group-buys` | CRUD, join deals | Public + Protected |
| `/api/chat` | rooms, messages, send | Protected |

---

## Authentication & Authorization

- **Local Authentication**: Secure Email/password with bcrypt hashing
- **JWT Tokens**: 7-day signed JSON Web Tokens stored in localStorage and cookies
- **Role-Based Access**: Granular Buyer, Farmer, and Admin tiers enforced via route protection middleware
- **Security Protections**: Rate limiting, helmet security headers, CORS origin control, mongo-sanitize NoSQL injection protection, and account suspension enforcement

---

## Getting Started

### Prerequisites
- Node.js >= 18.0.0
- MongoDB instance (local or MongoDB Atlas URI)

### Quick Start
```bash
# 1. Server setup
cd server
npm install
npm run seed    # Seed database with initial data
npm run dev     # Start backend server on port 5000

# 2. Client setup (in a separate terminal)
cd client
npm install
npm run dev     # Start frontend application on port 5173
```

### Demo Credentials
| Role | Email | Password |
|---|---|---|
| Admin | admin@demo.com | admin123 |
| Farmer | farmer@demo.com | demo123 |
| Buyer | buyer@demo.com | demo123 |
