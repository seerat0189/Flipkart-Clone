import "../styles/CategoryBar.css";

const categories = [
  { 
    name: "For You", 
    img: "https://cdn-icons-png.flaticon.com/512/1828/1828884.png" 
  },
  {
    name: "Grocery",
    img: "https://cdn-icons-png.flaticon.com/512/3081/3081559.png"
  },
  {
    name: "Mobiles",
    img: "https://cdn-icons-png.flaticon.com/512/15/15874.png"
  },
  {
    name: "Fashion",
    img: "https://cdn-icons-png.flaticon.com/512/892/892458.png"
  },
  {
    name: "Electronics",
    img: "https://cdn-icons-png.flaticon.com/512/1042/1042390.png"
  },
  {
    name: "Health",
    img: "https://cdn-icons-png.flaticon.com/128/2382/2382533.png"
  },
  {
    name: "Appliances",
    img: "https://cdn-icons-png.flaticon.com/128/3362/3362661.png"
  },
  {
    name: "Travel",
    img: "https://cdn-icons-png.flaticon.com/512/201/201623.png"
  },
  {
    name: "Beauty",
    img: "https://cdn-icons-png.flaticon.com/128/1807/1807383.png"
  },
  {
    name: "Two Wheelers",
    img: "https://cdn-icons-png.flaticon.com/128/741/741407.png"
  }
];

const CategoryBar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="category-bar">
      {categories.map((cat) => (
        <div
          key={cat.name}
          className={`category-item ${selectedCategory === cat.name ? "active" : ""}`}
          onClick={() => setSelectedCategory(cat.name)}
        >
          <img src={cat.img} alt={cat.name} />
          <p>{cat.name}</p>
        </div>
      ))}
    </div>
  );
};

export default CategoryBar;