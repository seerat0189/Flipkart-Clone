import "../styles/Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useCart } from "../context/CartContext";

import { FiShoppingCart } from "react-icons/fi";

const Navbar = () => {
  const navigate = useNavigate();
  const [query, setQuery] = useState("");

  const { cartCount } = useCart();

  const handleSearch = (e) => {
    if (e.key === "Enter" && query.trim() !== "") {
      navigate(`/?search=${query}`);
    }
  };

  return (
    <div className="navbar">

      <div className="nav-left" onClick={() => navigate("/")}>
        <div className="logo">Flipkart</div>
      </div>

      <div className="nav-search">
        <input
          type="text"
          placeholder="Search for Products, Brands and More"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleSearch}
        />

        {query && (
          <span className="clear-btn" onClick={() => setQuery("")}>
            ✖
          </span>
        )}
      </div>

      <div className="nav-right">

        <div className="nav-item">Become a Seller</div>

        <div className="cart" onClick={() => navigate("/cart")}>

          <FiShoppingCart className="cart-icon" />

          <span>Cart</span>

          {cartCount > 0 && (
            <span className="cart-badge">{cartCount}</span>
          )}
        </div>

      </div>

    </div>
  );
};

export default Navbar;