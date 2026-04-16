import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import "../styles/Checkout.css";

const Checkout = () => {
    const [cart, setCart] = useState([]);
    const [address, setAddress] = useState("");
    const [email, setEmail] = useState("");

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

    const proceedToSummary = () => {
        if (!address.trim()) {
            alert("Please enter shipping address");
            return;
        }

        if (!email.trim()) {
            alert("Please enter email");
            return;
        }

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            alert("Enter valid email");
            return;
        }

        navigate("/order-summary", {
            state: { cart, address, email }
        });
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
                            <p>₹{item.product.price} × {item.quantity}</p>
                        </div>
                    ))
                )}

                <h3>Total: ₹{total}</h3>

                <button
                    className="place-order-btn"
                    onClick={proceedToSummary}
                >
                    Review Order
                </button>
            </div>

        </div>
    );
};

export default Checkout;