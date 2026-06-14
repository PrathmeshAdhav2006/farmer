# Farmer Marketplace

An **AI-powered agricultural e-commerce platform** connecting farmers directly with buyers in Maharashtra, India. Built with a React frontend, Node.js/Express backend, MongoDB database, and integrated with Google Gemini AI for intelligent agriculture features.

---

## Tech Stack

### Frontend
- **React 18** with **Vite 5** (build tool)
- **Tailwind CSS 3** with dark mode and custom farmer-themed palette
- **shadcn/ui** components built on **Radix UI** primitives (40+ components)
- **Framer Motion** & **Aceternity UI** for animations
- **React Router v6** (nested routes, role-based access)
- **TanStack React Query v5** (server state management)
- **React Context API** (AuthContext, CartContext)
- **Axios** with token interceptors
- **React Hook Form + Zod** (form validation)
- **Recharts** (analytics charts)
- **React Leaflet** (interactive farm map)
- **Socket.io Client** (real-time chat & notifications)
- **Three.js** (3D visuals)

### Backend
- **Node.js + Express 4** (ES Modules)
- **MongoDB + Mongoose 8** (ODM)
- **JWT** authentication + **Google OAuth 2.0**
- **Socket.io** (real-time communication)
- **Razorpay** payment gateway
- **Google Gemini 1.5 Flash** AI integration
- **Nodemailer** (email service with HTML templates)
- **Multer** (file uploads), **Cloudinary** (cloud storage)
- **Helmet, CORS, Rate Limiting, Mongo Sanitize** (security)

### Machine Learning
- Python Flask ML service (price prediction models)
- Google Gemini AI (crop analysis, market advice)
- Simple Statistics linear regression (APMC price forecasting)

---

## Features

### For Farmers
- **Product Management**: List, edit, manage inventory with detailed crop data
- **AI Price Advisor**: Get intelligent price predictions based on APMC market trends
- **Crop Image Analysis**: Upload crop photos for AI-powered health assessment
- **Crop Recommendations**: AI suggests optimal crops based on season and region
- **Order Management**: View, confirm, ship, and manage incoming orders
- **Sales Analytics**: Visual dashboards with revenue trends and performance metrics
- **APMC Market Prices**: Real-time mandi price data for Maharashtra districts
- **Community Group-Buy Deals**: Create bulk discount deals for social commerce
- **Digital Product Passport**: Auto-generated traceability including farm location, harvest data, organic certifications, AI freshness score, and eco-sustainability metrics
- **Direct Buyer Chat**: Real-time messaging with potential buyers

### For Buyers
- **Browse Products**: Search and filter fresh produce by category, district, price
- **Shopping Cart**: Add items, manage quantities, checkout with online payment or COD
- **Order Tracking**: Real-time order status updates
- **Community Deals**: Join group-buying deals for wholesale discounts
- **Direct Farmer Communication**: Chat directly with farmers to negotiate
- **Farm Map**: Explore farm locations on an interactive map
- **Digital Product Passport**: View product origin, certifications, and freshness score
- **Order History**: Track past purchases and reorder

### For Admins
- **Dashboard Analytics**: Platform-wide metrics (users, orders, revenue)
- **User Management**: Verify farmers, ban/unban users
- **Product Moderation**: Approve/reject product listings
- **APMC Data Management**: Import and manage market price data
- **Platform Oversight**: Monitor all orders and users

### Platform Features
- **Role-Based Access Control**: Buyer, Farmer, Admin portals
- **Real-Time Notifications**: Socket.io-powered in-app alerts
- **Email Notifications**: Order confirmations, password reset, deal alerts
- **Secure Payments**: Razorpay integration with escrow support (orders > ₹5000) and COD
- **Google OAuth**: One-click login/signup
- **Responsive Design**: Mobile-friendly with dark mode by default

---

## Project Structure

```
farmer-marketplace/
├── client/                          # React Frontend
│   ├── src/
│   │   ├── components/
│   │   │   ├── layout/              # MainLayout, Navbar, Footer, DashboardLayout, AdminLayout
│   │   │   ├── auth/                # FarmerSignupForm, BuyerSignupForm
│   │   │   ├── landing/             # Hero, Features, HowItWorks, Stats, FeaturedProducts
│   │   │   ├── product/             # DigitalPassport
│   │   │   ├── shared/              # PrivateRoute, Loading, OnboardingWizard
│   │   │   ├── ui/                  # 40+ shadcn/ui components (button, card, dialog, etc.)
│   │   │   ├── aceternity/          # Aceternity animated UI components
│   │   │   └── glsl-hills.jsx       # 3D animated background component
│   │   ├── pages/
│   │   │   ├── public/              # Home, Products, ProductDetail, CommunityDeals
│   │   │   ├── auth/                # Login, Register, ForgotPassword, OAuthCallback
│   │   │   ├── buyer/               # Cart, Checkout, MyOrders, Profile, Settings, FarmMap
│   │   │   ├── farmer/              # Dashboard, Products, Orders, Analytics, PriceAdvisor, Deals, etc.
│   │   │   ├── admin/               # Dashboard, Users, Products, Orders, APMC, Settings
│   │   │   └── shared/              # Notifications, Messages
│   │   ├── context/                 # AuthContext, CartContext
│   │   ├── services/                # auth, user, order, payment, ai API services
│   │   ├── config/                  # Axios instance with interceptors
│   │   ├── lib/                     # Utility functions
│   │   └── constants/               # Location data (Maharashtra districts)
│   ├── vite.config.js
│   ├── tailwind.config.js
│   ├── postcss.config.js
│   └── .env
│
├── server/                          # Express Backend
│   ├── src/
│   │   ├── app.js                   # Express configuration & middleware
│   │   ├── config/                  # db.js, passport.js, razorpay.js, cloudinary.js
│   │   ├── models/                  # User, Product, Order, Review, Notification, Message, ChatRoom, GroupBuy, APMCPrice
│   │   ├── routes/                  # auth, product, cart, order, payment, user, admin, apmc, ai, notification, groupBuy, chat
│   │   ├── controllers/            # Business logic for each route
│   │   ├── middleware/              # auth, error, upload, validate
│   │   ├── services/               # email, notification, AI, SMS
│   │   ├── utils/                  # apiError, apiResponse, asyncHandler, validators
│   │   └── data/                   # crops.json, districts.json (Maharashtra)
│   ├── scripts/                    # seedData.js, seedFarmers.js
│   ├── server.js                   # Entry point
│   └── .env
│
├── ml/                              # Python ML Service
│   └── predictor.cpython-313.pyc    # Compiled ML model (Flask service on port 5001)
│
├── venv/                            # Python virtual environment
├── datasets/                        # Dataset storage (empty)
├── vercel.json                      # SPA rewrite rules
├── HOW_TO_RUN.txt                   # Local development setup guide
└── UNIQUE_IDEAS.txt                 # Unique value proposition
```

---

## API Endpoints

| Endpoint Group | Key Routes | Access |
|---------------|-----------|--------|
| `/api/auth` | register, login, logout, me, google oauth | Public + Protected |
| `/api/products` | CRUD, search, categories, autocomplete, sustainability-stats | Public + Farmer/Admin |
| `/api/cart` | get, add, update, remove, clear | Buyer only |
| `/api/orders` | create, my-orders, farmer orders, status, cancel, release-escrow | Protected (role-based) |
| `/api/payment` | create-order, verify, refund, webhook | Protected + Webhook |
| `/api/users` | profile, addresses, farmer stats/analytics, admin user management | Protected |
| `/api/admin` | stats, users, manage users | Admin only |
| `/api/apmc` | district prices, commodity history, import | Public + Admin |
| `/api/ai` | predict-price, crop-recommendations, analyze-crop | Protected |
| `/api/notifications` | get, mark-read, delete | Protected |
| `/api/group-buys` | CRUD, join deals | Public + Protected |
| `/api/chat` | rooms, messages, send | Protected |

---

## Database Models (9 Collections)

1. **User** — farmer/buyer/admin profiles with addresses, auth provider, cart
2. **Product** — crop listings with categories, quality grades, images, organic certifications
3. **Order** — full order lifecycle with escrow, payment methods, status history
4. **Review** — product ratings with verified purchase check, farmer replies
5. **Notification** — in-app notifications with metadata
6. **Message** — chat messages (text)
7. **ChatRoom** — one-on-one chat rooms tied to products
8. **GroupBuy** — community group-buying deals with progress tracking
9. **APMCPrice** — mandi price data by district, commodity, variety, grade

---

## Authentication & Authorization

- **Local Auth**: Email/password with bcrypt hashing
- **Google OAuth 2.0**: Passport.js strategy, auto-creates buyer accounts
- **JWT Tokens**: 7-day expiry, stored in localStorage + HTTP-only cookie
- **Role-Based Access**: Buyer, Farmer, Admin tiers enforced via middleware
- **Security**: Rate limiting, helmet, CORS, mongo-sanitize, account ban enforcement

---

## Getting Started

See [HOW_TO_RUN.txt](./HOW_TO_RUN.txt) for detailed local setup instructions.

### Quick Start
```bash
# Server
cd server
npm install
npm run seed    # Seed database with demo data
npm run dev     # Start on port 5000

# Client
cd client
npm install
npm run dev     # Start on port 3000
```

### Demo Credentials
| Role | Email | Password |
|------|-------|----------|
| Admin | admin@demo.com | admin123 |
| Farmer | farmer@demo.com | demo123 |
| Buyer | buyer@demo.com | demo123 |

---

## Unique Selling Points

- **AI-Powered Price Intelligence**: ML-based price prediction + Gemini market advice
- **AI Crop Quality Audit**: Image-based crop health analysis via Gemini vision
- **Digital Product Passport**: Full traceability with freshness & eco scores
- **Community Group-Buying**: Social commerce for bulk discounts
- **Direct Farmer-Buyer Chat**: Real-time negotiation without intermediaries
- **APMC Market Data Integration**: Government mandi prices for informed pricing

---

## Deployment

- **Frontend**: Deployed on Vercel (SPA with rewrite rules)
- **Backend**: Node.js server (render, railway, or any Node host)
- **Database**: MongoDB Atlas
- **File Storage**: Cloudinary for images
- **ML Service**: Python Flask server (separate deployment)
