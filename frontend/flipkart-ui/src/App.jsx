import React from 'react'
import "./App.css";

import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import ProductPage from "./pages/ProductPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Cart from "./pages/Cart";
import Footer from "./components/Footer";
import Checkout from "./pages/Checkout";
import OrderSuccess from "./pages/OrderSuccess";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <Navbar />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product/:id" element={<ProductPage />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/order-success/:id" element={<OrderSuccess />} />
          </Routes>
        </div>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;