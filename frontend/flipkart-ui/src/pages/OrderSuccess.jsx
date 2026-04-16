import { useParams, useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const deliveryDate = new Date();
  deliveryDate.setDate(deliveryDate.getDate() + 3);

  return (
    <div className="order-success">

      <div className="success-card">

        <div className="success-icon">
          <span className="tick-mark">✔</span>
        </div>

        <h1>Order Placed Successfully!</h1>
        <p className="subtext">Your order has been confirmed</p>

        <h2 className="order-id">Order ID: #{id}</h2>

        <p className="delivery">
          🚚 Delivery by <strong>{deliveryDate.toDateString()}</strong>
        </p>

        <p className="note">
          You will receive an email confirmation shortly.
        </p>

        <div className="actions">
          <button onClick={() => navigate("/")}>
            Continue Shopping
          </button>
        </div>

      </div>

    </div>
  );
};

export default OrderSuccess;