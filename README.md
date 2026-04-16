# 🛒 Flipkart Clone (MERN + Prisma)

A full-stack e-commerce web application inspired by Flipkart, built using **React, Node.js, Express, and Prisma ORM**.

---

## 🚀 Features

### 🛍️ Product Features

* Browse products by categories
* Product listing with images, price, and discount
* Product detail page

### 🛒 Cart System

* Add to cart
* Update quantity (+ / -)
* Remove items
* Dynamic cart total calculation

### 🔍 Search

* Search products using navbar
* Real-time filtering

### 📦 Order System

* Checkout page with:

  * Shipping address input
  * Email input
* Place order functionality
* Order success page with Order ID

### 📧 Email Notification

* Order confirmation email sent using **Nodemailer**
* Includes:

  * Order ID
  * Items purchased
  * Total amount
  * Delivery message

### 🎨 UI/UX

* Flipkart-inspired UI
* Responsive design (mobile + tablet)
* Toast notifications
* Loading states

---

## 🛠️ Tech Stack

### Frontend

* React (Vite)
* CSS (Custom styling)

### Backend

* Node.js
* Express.js

### Database

* PostgreSQL
* Prisma ORM

### Other Tools

* Nodemailer (Email service)
* Axios (API calls)

---

## 📂 Project Structure

```text
frontend/
backend/
  ├── controllers/
  ├── routes/
  ├── prisma/
  ├── utils/
```

---

## ⚙️ Installation & Setup

### 1️⃣ Clone Repository

```bash
git clone https://github.com/your-username/flipkart-clone.git
cd flipkart-clone
```

---

### 2️⃣ Backend Setup

```bash
cd backend
npm install
```

Create `.env` file:

```env
DATABASE_URL=your_database_url
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password
PORT=5005
```

Run backend:

```bash
npm run dev
```

---

### 3️⃣ Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

---

## 🌐 API Endpoints

* `/api/products` → Get products
* `/api/cart` → Cart operations
* `/api/orders` → Place order

---

## 📸 Screens (Optional)

* Home Page
* Cart Page
* Checkout Page
* Order Success Page

---

## 🚀 Deployment

Frontend: Vercel / Netlify
Backend: Render / Railway
Database: Supabase / Neon

---

## 💡 Future Improvements

* User authentication (JWT)
* Payment integration
* Order history page
* Wishlist feature

---

## 👨‍💻 Author

Seerat Kaur
