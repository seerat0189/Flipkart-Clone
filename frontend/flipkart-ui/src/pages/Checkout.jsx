import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import "../styles/Checkout.css";

const Checkout = () => {
  const [cart, setCart] = useState([]);
  const [address, setAddress] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const { fetchCart: refreshBadge } = useCart();

  useEffect(() => {
    fetchCart();
  }, []);

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  const placeOrder = async () => {
  if (!email.trim() || !address.trim()) {
    alert("Please enter email and shipping address");
    return;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    alert("Enter valid email");
    return;
  }

  try {
    setLoading(true);

    const res = await API.post("/orders", {
      shippingAddress: address,
      email: email
    });

    await refreshBadge();

    navigate(`/order-success/${res.data.order.id}`);

  } catch (err) {
    console.log(err);
    alert(err.response?.data?.message || "Order failed");
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="checkout-page">

      <div className="checkout-left">
        <h2>Shipping Details</h2>

        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="input-box"
        />

        <textarea
          placeholder="Enter full address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address-box"
        />
      </div>

      <div className="checkout-right">
        <h2>Order Summary</h2>

        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          cart.map(item => (
            <div key={item.id} className="summary-item">
              <p>{item.product.name}</p>
              <p>₹{item.product.price} x {item.quantity}</p>
            </div>
          ))
        )}

        <h3>Total: ₹{total}</h3>

        <button
          className="place-order-btn"
          onClick={placeOrder}
          disabled={loading}
        >
          {loading ? "Placing..." : "Place Order"}
        </button>
      </div>

    </div>
  );
};

export default Checkout;