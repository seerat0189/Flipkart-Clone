import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import "../styles/Cart.css";

const Cart = () => {
  const [cart, setCart] = useState([]);
  const navigate = useNavigate();

  const { fetchCart: refreshBadge } = useCart();

  const fetchCart = async () => {
    try {
      const res = await API.get("/cart");
      setCart(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const updateQuantity = async (id, quantity) => {
    if (quantity < 1) return;

    try {
      await API.put(`/cart/${id}`, { quantity });
      await fetchCart();
      refreshBadge();
    } catch (err) {
      console.log(err);
    }
  };

  const removeItem = async (id) => {
    try {
      await API.delete(`/cart/${id}`);
      await fetchCart();
      refreshBadge();
    } catch (err) {
      console.log(err);
    }
  };

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  const total = cart.reduce(
    (sum, item) => sum + Number(item.product.price) * item.quantity,
    0
  );

  return (
    <div className="cart-page">

      {cart.length === 0 ? (
        <div className="empty-cart">
          <h2>Your cart is empty 🛒</h2>
        </div>
      ) : (
        <>
          <div className="cart-items">
            {cart.map(item => {

              const imageUrl = item.product.images?.[0]?.imageUrl
                ? item.product.images[0].imageUrl.startsWith("http")
                  ? item.product.images[0].imageUrl
                  : `http://localhost:5005${item.product.images[0].imageUrl}`
                : "https://dummyimage.com/150x150/cccccc/000000&text=Product";

              return (
                <div key={item.id} className="cart-card">

                  <img
                    src={imageUrl}
                    alt={item.product.name}
                    onError={(e) => {
                      e.target.src =
                        "https://dummyimage.com/150x150/cccccc/000000&text=No+Image";
                    }}
                  />

                  <div className="cart-info">
                    <h3>{item.product.name}</h3>
                    <p>₹{formatPrice(item.product.price)}</p>

                    <div className="qty">
                      <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>-</button>
                      <span>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                    </div>

                    <button
                      className="remove"
                      onClick={() => removeItem(item.id)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
          <div className="summary">
            <h2>Price Details</h2>
            <p>Total: ₹{formatPrice(total)}</p>

            <button
              className="checkout"
              onClick={() => navigate("/checkout")}
            >
              Proceed to Checkout
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;