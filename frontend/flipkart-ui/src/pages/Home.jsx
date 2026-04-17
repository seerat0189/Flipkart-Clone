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
  const [selectedCategory, setSelectedCategory] = useState("For You");

  const { fetchCart } = useCart();

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const searchQuery = searchParams.get("search")?.toLowerCase() || "";

  useEffect(() => {
    API.get("/products")
      .then(res => setProducts(res.data))
      .catch(err => console.log(err));
  }, []);

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchQuery);

    if (selectedCategory === "For You") {
      return matchesSearch;
    }

    return matchesSearch && p.category === selectedCategory;
  });

  const uniqueProducts = Array.from(
    new Map(filteredProducts.map(p => [p.id, p])).values()
  );

  const section1 = products.slice(0, 6);
  const section2 = products.slice(6, 12);
  const section3 = products.slice(12, 18);
  const section4 = products.slice(18, 24);

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
      <CategoryBar
        selectedCategory={selectedCategory}
        setSelectedCategory={setSelectedCategory}
      />

      <Hero />

      {message && <div className="toast">{message}</div>}

      {searchQuery ? (
        <div className="product-feed">
          {uniqueProducts.length === 0 ? (
            <h2 style={{ padding: "20px" }}>No products found</h2>
          ) : (
            uniqueProducts.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))
          )}
        </div>
      ) : (
        <>
          {selectedCategory === "For You" && (
            <>
              <Section title="Grab or Gone" bg="#e6f4ea">
                {section1.map(p => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
              </Section>

              <Section title="Best Gadgets & Appliances" bg="#f3e8ff">
                {section2.map(p => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
              </Section>

              <Section title="Top Picks of the Sale" bg="#e0f2fe">
                {section3.map(p => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
              </Section>

              <Section title="Trending Products" bg="#fff7ed">
                {section4.map(p => (
                  <ProductCard key={p.id} product={p} addToCart={addToCart} />
                ))}
              </Section>
            </>
          )}

          <div className="product-feed">
            {uniqueProducts.map(p => (
              <ProductCard key={p.id} product={p} addToCart={addToCart} />
            ))}
          </div>
        </>
      )}
    </>
  );
};

export default Home;