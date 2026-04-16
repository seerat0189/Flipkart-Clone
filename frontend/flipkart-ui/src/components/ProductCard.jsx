import "../styles/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product, addToCart }) => {
  const navigate = useNavigate();

  const discount = Math.floor(Math.random() * 40) + 10;

  const originalPrice = Math.round(
    product.price / (1 - discount / 100)
  );

  const formatPrice = (price) =>
    new Intl.NumberFormat("en-IN").format(price);

  const imageUrl = product.images?.[0]?.imageUrl
    ? product.images[0].imageUrl.startsWith("http")
      ? product.images[0].imageUrl
      : `http://localhost:5005${product.images[0].imageUrl}`
    : "https://dummyimage.com/200x200/cccccc/000000&text=Product";

  return (
    <div className="card">

      <span className="badge">{discount}% OFF</span>

      <div
        className="click-area"
        onClick={() => navigate(`/product/${product.id}`)}
      >
        <img
          src={imageUrl}
          alt={product.name}
          onError={(e) => {
            e.target.src =
              "https://dummyimage.com/200x200/cccccc/000000&text=No+Image";
          }}
        />

        <p className="title">{product.name}</p>

        <div className="rating">4.5 ⭐</div>

        <div className="price-section">
          <span className="price">₹{formatPrice(product.price)}</span>
          <span className="old-price">₹{formatPrice(originalPrice)}</span>
        </div>
      </div>

      <button
        disabled={product.stockQuantity === 0}
        onClick={(e) => {
          e.stopPropagation();
          addToCart(product.id);
        }}
      >
        {product.stockQuantity === 0 ? "Out of Stock" : "Add to Cart"}
      </button>

    </div>
  );
};

export default ProductCard;