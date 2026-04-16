import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { useCart } from "../context/CartContext";
import API from "../services/api";
import ProductCard from "../components/ProductCard";
import CategoryBar from "../components/CategoryBar";
import Hero from "../components/Hero";
import Section from "../components/Section";
import "../styles/Home.css";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [message, setMessage] = useState("");

  const { fetchCart } = useCart();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredProducts = products.filter(p =>
    p.name.toLowerCase().includes(searchQuery)
  );

  const addToCart = async (id) => {
    try {
      await API.post("/cart", {
        productId: id,
        quantity: 1
      });

      fetchCart();

      setMessage("Added to cart");
      setTimeout(() => setMessage(""), 2000);

    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <CategoryBar />
      <Hero />

      {message && <div className="toast">{message}</div>}

      {searchQuery ? (
        <div className="product-feed">
          {filteredProducts.length === 0 ? (
            <h2 style={{ padding: "20px" }}>No products found</h2>
          ) : (
            filteredProducts.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))
          )}
        </div>
      ) : (
        <>
          <Section title="Grab or Gone" bg="#e6f4ea">
            {products.slice(0, 6).map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </Section>

          <Section title="Best Gadgets & Appliances" bg="#f3e8ff">
            {products.slice(6, 12).map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </Section>

          <Section title="Top Picks of the Sale" bg="#e0f2fe">
            {products.slice(12, 18).map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </Section>

          <Section title="Trending Products" bg="#fff7ed">
            {products.slice(18, 24).map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </Section>

          <Section title="Fashion Deals" bg="#fce7f3">
            {products.slice(0, 6).map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </Section>

          <div className="product-feed">
            {products.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;