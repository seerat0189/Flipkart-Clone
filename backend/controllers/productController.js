const prisma = require('../config/prisma');

exports.getAllProducts = async (req, res) => {
  try {
    const { search, category } = req.query;

    const products = await prisma.product.findMany({
      where: {
        name: {
          contains: search || "",
          mode: "insensitive"
        },
        category: category || undefined
      },
      include: {
        images: true
      }
    });

    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getProductById = async (req, res) => {
  try {
    const product = await prisma.product.findUnique({
      where: { id: parseInt(req.params.id) },
      include: {
        images: true
      }
    });

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};