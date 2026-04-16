import { useState, useEffect } from "react";
import "../styles/Hero.css";

const slides = [
  {
    bgImage:
      "https://cdn.gyftr.com/blog/wp-content/uploads/2025/09/09124913/Blog-1.png"
  },
  {
    title: "Fashion Sale",
    subtitle: "Min 50% Off on Top Brands",
    bgImage:
      "https://png.pngtree.com/thumb_back/fw800/back_our/20190622/ourmid/pngtree-purple-ray-light-strip-minimalist-banner-background-image_210030.jpg"
  },
  {
    title: "Mobile Bonanza",
    subtitle: "Extra Exchange Offers",
    bgImage:
      "https://static.vecteezy.com/system/resources/thumbnails/017/662/754/small_2x/abstract-orange-modern-banner-background-free-photo.jpg"
  },
  {
    bgImage:
      "https://storiesflistgv2.blob.core.windows.net/stories/2021/05/FKSfooterbanner_new__.jpg"
  }
];

const Hero = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide();
    }, 3000);

    return () => clearInterval(interval);
  }, [index]);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setIndex((prev) =>
      prev === 0 ? slides.length - 1 : prev - 1
    );
  };

  return (
    <div className="hero-container">

      <div
        className="hero-slider"
        style={{ transform: `translateX(-${index * 100}%)` }}
      >
        {slides.map((slide, i) => (
          <div
            key={i}
            className="hero-slide"
            style={
              slide.bgImage
                ? {
                  backgroundImage: `url(${slide.bgImage})`,
                  backgroundSize: "cover",
                  backgroundPosition: "center"
                }
                : { background: slide.bg }
            }
          >
            {slide.title && (
              <div className="hero-overlay">
                <h1>{slide.title}</h1>
                <p>{slide.subtitle}</p>
                <button className="shop-btn">Shop Now</button>
              </div>
            )}
          </div>
        ))}
      </div>

      <button className="arrow left" onClick={prevSlide}>‹</button>
      <button className="arrow right" onClick={nextSlide}>›</button>

      <div className="dots">
        {slides.map((_, i) => (
          <span
            key={i}
            className={index === i ? "dot active" : "dot"}
            onClick={() => setIndex(i)}
          ></span>
        ))}
      </div>

    </div>
  );
};

export default Hero;