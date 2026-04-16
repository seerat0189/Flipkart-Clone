import { createContext, useContext, useState, useEffect } from "react";
import API from "../services/api";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const [cartCount, setCartCount] = useState(0);

    const fetchCart = async () => {
        try {
            const res = await API.get("/cart");
            const totalQty = res.data.reduce(
                (sum, item) => sum + item.quantity,
                0
            );

            setCartCount(totalQty);

        } catch (err) {
            console.log(err);
        }
    };

    useEffect(() => {
        fetchCart();
    }, []);

    return (
        <CartContext.Provider value={{ cartCount, fetchCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);