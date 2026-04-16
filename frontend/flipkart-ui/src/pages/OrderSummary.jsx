import { useLocation, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useState } from "react";
import API from "../services/api";
import "../styles/OrderSummary.css";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { fetchCart: refreshBadge } = useCart();

  const [loading, setLoading] = useState(false);

  const { cart, address, email } = location.state || {};

  if (!cart) {
    return <h2 style={{ padding: "20px" }}>No order data found</h2>;
  }

  const total = cart.reduce(
    (sum, item) => sum + item.product.price * item.quantity,
    0
  );

  // 📦 DELIVERY DATE (2-3 days)
  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  const placeOrder = async () => {
    if (loading) return;

    setLoading(true);

    try {
      const res = await API.post("/orders", {
        shippingAddress: address,
        email
      });

      await refreshBadge();

      navigate(`/order-success/${res.data.order.id}`);
    } catch (err) {
      console.log(err);
      alert("Order failed");
      setLoading(false);
    }
  };

  return (
    <div className="summary-page">

      {loading && (
        <div className="loading-overlay">
          <div className="loader"></div>
          <p>Processing your order...</p>
        </div>
      )}

      {/* LEFT */}
      <div className="summary-left">

        <h2>Delivery Address</h2>
        <p className="address">{address}</p>

        <h3 className="delivery">
          🚚 Delivery by {deliveryDate.toDateString()}
        </h3>

        <h2>Order Items</h2>

        {cart.map(item => {
          const imageUrl = item.product.images?.[0]?.imageUrl
            ? item.product.images[0].imageUrl.startsWith("http")
              ? item.product.images[0].imageUrl
              : `http://localhost:5005${item.product.images[0].imageUrl}`
            : "https://dummyimage.com/100x100/cccccc/000000&text=Product";

          return (
            <div key={item.id} className="summary-card">

              <img src={imageUrl} alt={item.product.name} />

              <div className="info">
                <p className="name">{item.product.name}</p>
                <p>₹{item.product.price} × {item.quantity}</p>
              </div>

            </div>
          );
        })}

      </div>

      {/* RIGHT */}
      <div className="summary-right">
        <h2>Price Details</h2>

        <p>Total: ₹{total}</p>

        <button onClick={placeOrder} disabled={loading}>
          {loading ? "Placing Order..." : "Confirm Order"}
        </button>
      </div>

    </div>
  );
};

export default OrderSummary;