const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log("Seeding started...");
  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.cartItem.deleteMany();
  await prisma.productImage.deleteMany();
  await prisma.product.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$executeRawUnsafe(
  `ALTER SEQUENCE "User_id_seq" RESTART WITH 1;`
);

  const user = await prisma.user.create({
  data: {
    name: "Test User",
    email: "test@gmail.com"
  }
});

console.log("USER ID:", user.id);

  const products = [
    // PHONES
    {
      name: "iPhone 15",
      price: 69999,
      category: "Mobiles",
      image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._AC_UF350,350_QL80_.jpg"
    },
    {
      name: "Samsung S24 Ultra",
      price: 129999,
      category: "Mobiles",
      image: "https://in.static.webuy.com/product_images/Phones/Phones%20Android/SSAMS928B512GTGUNLB_l.jpg"
    },

    // LAPTOPS
    {
      name: "MacBook Air M3",
      price: 99999,
      category: "Laptops",
      image: "https://m.media-amazon.com/images/I/71h-tsPzk5L._AC_UF1000,1000_QL80_.jpg"
    },
    {
      name: "HP Pavilion",
      price: 54999,
      category: "Laptops",
      image: "https://rukminim2.flixcart.com/image/480/640/xif0q/computer/e/d/u/-original-imahg5fxveydrzc5.jpeg?q=90"
    },

    // HEADPHONES
    {
      name: "Sony WH-1000XM5",
      price: 26990,
      category: "Electronics",
      image: "https://platform.theverge.com/wp-content/uploads/sites/2/chorus/uploads/chorus_asset/file/23455710/sony.jpg?quality=90&strip=all&crop=0,3.929539295393,100,92.140921409214"
    },
    {
      name: "Boat Airdopes 141",
      price: 1499,
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/71LStnbkz4L._AC_UF1000,1000_QL80_.jpg"
    },

    // TV
    {
      name: "Samsung 4K Smart TV",
      price: 45999,
      category: "Electronics",
      image: "https://images.samsung.com/is/image/samsung/p6pim/in/ua43cu8000klxl/gallery/in-crystal-uhd-cu8000-ua43cu8000klxl-535858464?$Q90_1248_936_F_PNG$"
    },

    // WATCHES
    {
      name: "Noise Smart Watch",
      price: 2999,
      category: "Wearables",
      image: "https://m.media-amazon.com/images/I/61jOliJK5CL._AC_UF1000,1000_QL80_.jpg"
    },

    // SHOES
    {
      name: "Nike Running Shoes",
      price: 3999,
      category: "Fashion",
      image: "https://hips.hearstapps.com/hmg-prod/images/lede-1600878519.jpg?resize=980:*"
    },

    // MORE (add bulk)
    ...Array.from({ length: 15 }).map((_, i) => ({
      name: `Product ${i + 1}`,
      price: Math.floor(Math.random() * 50000) + 1000,
      category: "General",
      image: "https://images.squarespace-cdn.com/content/v1/600d6b502c69ea16574c040d/1fffe08a-1c6b-4134-a0a5-8a22a68d29d6/Outdoor+Lifestyle+Product+Photography+Los+Angeles+Photographer+Brian+Brown-2.jpg"
    }))
  ];

  for (let p of products) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        price: p.price,
        category: p.category,
        stockQuantity: 10
      }
    });

    await prisma.productImage.create({
      data: {
        productId: product.id,
        imageUrl: p.image
      }
    });
  }

  console.log("✅ Seed data added");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());