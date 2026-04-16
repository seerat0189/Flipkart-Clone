import { useRef } from "react";
import "../styles/Section.css";

const Section = ({ title, children, bg }) => {
  const scrollRef = useRef();

  const scrollRight = () => {
    scrollRef.current.scrollBy({
      left: 300,
      behavior: "smooth"
    });
  };
  const scrollLeft = () => {
    scrollRef.current.scrollBy({
      left: -300,
      behavior: "smooth"
    });
  };

  return (
    <div className="section" style={{ background: bg }}>

      <div className="section-header">
        <h2>{title}</h2>
      </div>

      <button className="arrow left" onClick={scrollLeft}>←</button>
      <button className="arrow right" onClick={scrollRight}>→</button>

      <div className="scroll-container" ref={scrollRef}>
        {children}
      </div>

    </div>
  );
};

export default Section;