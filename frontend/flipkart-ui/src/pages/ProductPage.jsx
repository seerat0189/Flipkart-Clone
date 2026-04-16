import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import "../styles/ProductPage.css";

const ProductPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { fetchCart } = useCart();

  const [product, setProduct] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    API.get(`/products/${id}`)
      .then(res => setProduct(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const addToCart = async () => {
    if (loading) return;

    try {
      setLoading(true);

      await API.post("/cart", {
        productId: product.id,
        quantity: 1
      });

      fetchCart();

      setMessage("Added to cart");
      setTimeout(() => setMessage(""), 2000);

      setLoading(false);

    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  if (!product) return <p>Loading...</p>;

  const imageUrl = product.images?.[0]?.imageUrl
    ? product.images[0].imageUrl.startsWith("http")
      ? product.images[0].imageUrl
      : `http://localhost:5005${product.images[0].imageUrl}`
    : "https://dummyimage.com/300x300/cccccc/000000&text=Product";

  return (
    <div className="product-page">

      {message && <div className="toast">{message}</div>}

      <div className="left">
        <img
          src={imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.src = "https://dummyimage.com/300x300/cccccc/000000&text=No+Image";
          }}
        />

        <div className="buttons">
          <button
            className="cart-btn"
            onClick={addToCart}
            disabled={product.stockQuantity === 0}
          >
            {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
          </button>

          <button
            className="buy-btn"
            onClick={() => {
              addToCart();
              navigate("/cart");
            }}
          >
            Buy Now
          </button>
        </div>
      </div>

      <div className="right">
        <h2>{product.name}</h2>

        <div className="rating-box">4.2 ★</div>

        <p className="price">
          ₹{new Intl.NumberFormat("en-IN").format(product.price)}
        </p>

        <p className="delivery">🚚 Delivery in 2-3 days</p>
        <p className="seller">Seller: RetailNet</p>

        <ul className="highlights">
          <li>High quality product</li>
          <li>Durable material</li>
          <li>Best in this price range</li>
          <li>Fast delivery available</li>
        </ul>

        <p className="desc">{product.description}</p>

        <p className="stock">
          {product.stockQuantity > 0 ? "In Stock" : "Out of Stock"}
        </p>
      </div>

    </div>
  );
};

export default ProductPage;