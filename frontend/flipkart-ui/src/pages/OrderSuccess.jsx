import { useParams, useNavigate } from "react-router-dom";
import "../styles/OrderSuccess.css";

const OrderSuccess = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    return (
        <div className="order-success">

            <div className="success-card">

                <div className="success-icon">✔</div>

                <h1>Order Placed Successfully!</h1>
                <p>Your order has been confirmed</p>

                <h2 className="order-id">Order ID: #{id}</h2>

                <p className="delivery">🚚 Delivery in 2-3 days</p>

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