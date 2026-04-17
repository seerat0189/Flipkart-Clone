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

  const categories = [
    "Grocery",
    "Mobiles",
    "Fashion",
    "Electronics",
    "Health",
    "Appliances",
    "Travel",
    "Beauty",
    "Two Wheelers"
  ];

  const baseProducts = [
    {
      name: "iPhone 15",
      price: 69999,
      category: "Mobiles",
      image: "https://m.media-amazon.com/images/I/71d7rfSl0wL._SX679_.jpg"
    },
    {
      name: "Samsung Galaxy S24 Ultra",
      price: 129999,
      category: "Mobiles",
      image: "https://m.media-amazon.com/images/I/81vxWpPpgNL.jpg"
    },
    {
      name: "Men Cotton Casual Shirt",
      price: 799,
      category: "Fashion",
      image: "https://i5.walmartimages.com/seo/CYiJun-George-Men-s-Cotton-Linen-Shirts-Short-Sleeve-Casual-Shirts-Button-Down-Shirt-for-Men-Beach-Summer-Wedding-Shirt_d28b0bcc-9208-44c6-80c7-b13ab1f6ca36.ab80f5a5cb04ba1373e0872749996c6e.jpeg"
    },
    {
      name: "Women Kurti Set",
      price: 1299,
      category: "Fashion",
      image: "https://m.media-amazon.com/images/I/71BGAXRA1RL._SL1500_.jpg"
    },
    {
      name: "HP Laptop 15s",
      price: 55999,
      category: "Electronics",
      image: "https://cdn1.smartprix.com/rx-iqQ76ZiIa-w1200-h1200/qQ76ZiIa.jpg"
    },
    {
      name: "Boat Rockerz Headphones",
      price: 1499,
      category: "Electronics",
      image: "https://m.media-amazon.com/images/I/61ljxTBpTCL._AC_.jpg"
    },
    {
      name: "Aashirvaad Atta 5kg",
      price: 320,
      category: "Grocery",
      image: "https://static.wixstatic.com/media/ae418e_6473bcb90ece443ab9eb34b60727c0b0~mv2.png/v1/fill/w_500,h_500,al_c,q_85,enc_avif,quality_auto/ae418e_6473bcb90ece443ab9eb34b60727c0b0~mv2.png"
    },
    {
      name: "Fortune Sunflower Oil",
      price: 180,
      category: "Grocery",
      image: "https://thebasilfoods.com/wp-content/uploads/2020/07/FORTUNE-OIL.jpg"
    },
    {
      name: "Lakme Lipstick",
      price: 399,
      category: "Beauty",
      image: "https://assets.myntassets.com/h_200,w_200,c_fill,g_auto/h_1440,q_100,w_1080/v1/assets/images/13105574/2024/3/8/623f5ada-68cb-4770-afef-614e5d7812ad1709875300051-Lakme-9-to-5-Primer--Matte-Lipstick---Pink-Perfect-MP1-96417-1.jpg"
    },
    {
      name: "Digital Thermometer",
      price: 199,
      category: "Health",
      image: "https://m.media-amazon.com/images/I/51CLnqWVNzL.jpg"
    },
    {
      name: "Prestige Pressure Cooker",
      price: 2499,
      category: "Appliances",
      image: "https://i5.walmartimages.com/seo/Prestige-Popular-Stainless-Steel-Pressure-Cooker-3-litres_eef46da0-cd07-4689-b2ae-c64db61602de.0f1f5cd53c6e1d5e6120443d6ee7c65c.jpeg"
    },
    {
      name: "Travel Backpack 40L",
      price: 1499,
      category: "Travel",
      image: "https://m.media-amazon.com/images/I/71P-L-WSk8L.jpg"
    },
    {
      name: "Vega Bike Helmet",
      price: 899,
      category: "Two Wheelers",
      image: "https://images-cdn.ubuy.co.in/639d527b952065755538acdf-vega-helmets-off-road-mcx-mcx.jpg"
    }
  ];

  const namesMap = {
    Grocery: ["India Gate Rice", "Great Value Cooking Oil", "Sky Plus Sugar Pack"],
    Mobiles: ["Xiaomi 12 Pro Dimensity Edition", "OPPO Reno 10 Series Phone", "Realme 15T 5G"],
    Fashion: ["Solid Drop Shoulder Tee", "High Rise Wide Leg Jeans", "Jordan Spizike Shoes"],
    Electronics: ["JBL Portable Bluetooth Speaker", "Apple Smart Watch", "LANGTU Membrane Gaming Keyboard"],
    Health: ["Optimum Nutrition Gold Standard Protein Powder", "Mason Natural Daily Multiple Vitamin Tablets", "Micro SW30MR Digital Weighing Scale"],
    Appliances: ["Bajaj Mixer Grinder", "Stainless Steel Electric Tea Kettle", "Steam Flatiron 2200W"],
    Travel: ["Suitcase Hardside 3 Piece Luggage Set", "Gonex Canvas Duffle Bag", "Memory Foam Neck Pillow"],
    Beauty: ["POND'S Dry Skin Cream Facial Moisturizer", "Bella Vita Luxury Date Woman Perfume", "L'Oreal Extraordinary Oil Hair Serum"],
    "Two Wheelers": ["Bike Cover", "Riding Gloves", "Bike Accessories"]
  };

  const imageMap = {
    Grocery: [
      "https://m.media-amazon.com/images/I/7178lJWzEyL._SL1500_.jpg",
      "https://i5.walmartimages.com/seo/Great-Value-Vegetable-Oil-48-fl-oz_2731cf13-31a9-49c2-bdbc-a5d30f7f241f.ac75f143c58969ad50818fff546f15ab.jpeg",
      "https://5.imimg.com/data5/YD/DJ/MY-70422967/skyplus-sugar.jpg"
    ],
    Mobiles: [
      "https://i.gadgets360cdn.com/products/large/xiaomi-12-pro-dimensity-edition-609x800-1656944132.jpg",
      "https://opsg-img-cdn-gl.heytapimg.com/epb/202306/20/RxkyDh1sbWEj2zAF.png",
      "https://image01.realme.net/general/20241024/17297586391150d6801e6492841f5940b42a235580891.png"
    ],
    Fashion: [
      "https://i.pinimg.com/originals/80/5f/c4/805fc4b6d9cca0acace82db28258defa.jpg",
      "https://i.pinimg.com/originals/24/23/d7/2423d7adb3456b95d3b08752b668dbbf.jpg",
      "https://static.nike.com/a/images/t_web_pw_592_v2/f_auto/u_126ab356-44d8-4a06-89b4-fcdcc8df0245,c_scale,fl_relative,w_1.0,h_1.0,fl_layer_apply/b2c5418e-2564-4a42-9bc9-51cf5d2c78b6/JORDAN+SPIZIKE+LOW.png"
    ],
    Electronics: [
      "https://i5.walmartimages.com/asr/4e4b6806-dd04-4278-82df-4e726facc3ea_1.8fdfbef9493e8f727490f51f43ceeb07.jpeg",
      "https://www.bhphotovideo.com/images/images2500x2500/apple_mj3t2ll_a_watch_sport_smartwatch_42mm_1187199.jpg",
      "https://m.media-amazon.com/images/I/71vocJjpqnL._AC_SL1500_.jpg"
    ],
    Health: [
      "https://m.media-amazon.com/images/I/71f+UBXh2vL._AC_SL1500_.jpg",
      "https://i5.walmartimages.com/asr/0853a1f6-5e9d-4edc-9132-8f53c7be9cdc.339969433bbce48b90ae559619097389.jpeg",
      "https://store.sascoafrica.com/wp-content/uploads/2023/01/Micro-SW30MR-Image-1.jpg"
    ],
    Appliances: [
      "https://rukminim1.flixcart.com/image/1664/1664/mixer-grinder-juicer/g/h/h/bajaj-px-80-f-gx-1-mixer-grinder-original-imaegmg3f75hscfk.jpeg?q=90",
      "https://m.media-amazon.com/images/I/713H+x9OtML._AC_.jpg",
      "https://images.nexusapp.co/assets/82/17/cd/169324139.jpg"
    ],
    Travel: [
      "https://i5.walmartimages.com/asr/87f8e797-4ff4-4cc7-89f0-361d447146bd.e3ae7a97b2ae80165452735a36728621.jpeg",
      "https://m.media-amazon.com/images/I/81V7f+NaMPL._AC_SL1500_.jpg",
      "https://m.media-amazon.com/images/I/61oM+QvR7kL._AC_SL1500_.jpg"
    ],
    Beauty: [
      "https://i5.walmartimages.com/seo/POND-S-Dry-Skin-Cream-Facial-Moisturizer-10-1-oz_55227e41-ecf5-48f2-8c52-8038d490741d_1.c0d83fae8668961ab4bd1c583d1a9da1.jpeg",
      "https://m.media-amazon.com/images/I/61CwlTcZqJL.jpg",
      "https://m.media-amazon.com/images/I/51pXqlnj+zL._SL1080_.jpg"
    ],
    "Two Wheelers": [
      "https://i5.walmartimages.com/seo/Bike-Cover-Outdoor-Storage-Waterproof-3-Bikes-300D-Oxford-Fabric-E-Bike-Rainproof-Mountain-With-Keyhole-Bag_d45fb907-be1d-459e-a1a9-3b5652dbd273.9b42ec8a872c9a57afc4b947491ac612.jpeg",
      "https://m.media-amazon.com/images/I/81nI+wZuVvL._AC_.jpg",
      "https://girlscycle.com/wp-content/uploads/2024/01/photo-of-bicycle-component-accessories.jpg"
    ]
  };

  const extraProducts = [];

  categories.forEach(category => {
    const nameList = namesMap[category];
    const images = imageMap[category];

    const count = Math.min(nameList.length, images.length);

    for (let i = 0; i < count; i++) {
      extraProducts.push({
        name: nameList[i],
        price: Math.floor(Math.random() * 5000) + 200,
        category,
        image: images[i]
      });
    }
  });

  const finalProducts = [...baseProducts, ...extraProducts];

  for (let p of finalProducts) {
    const product = await prisma.product.create({
      data: {
        name: p.name,
        price: p.price,
        category: p.category,
        stockQuantity: Math.floor(Math.random() * 20) + 5
      }
    });

    await prisma.productImage.create({
      data: {
        productId: product.id,
        imageUrl: p.image
      }
    });
  }

  console.log("✅ Seed data added successfully");
}

main()
  .catch(e => console.error(e))
  .finally(() => prisma.$disconnect());