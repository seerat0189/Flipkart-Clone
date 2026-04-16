import "../styles/ProductCard.css";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
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
    <div
      className="card"
      onClick={() => navigate(`/product/${product.id}`)}
    >

      <span className="badge">{discount}% OFF</span>

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

      <p className={`stock ${product.stockQuantity === 0 ? "out" : ""}`}>
        {product.stockQuantity === 0 ? "Out of Stock" : "In Stock"}
      </p>

    </div>
  );
};

export default ProductCard;