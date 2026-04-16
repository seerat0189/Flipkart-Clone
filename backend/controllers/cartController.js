const prisma = require('../config/prisma');

const USER_ID = 1;

exports.getCart = async (req, res) => {
  try {
    const cart = await prisma.cartItem.findMany({
      where: { userId: USER_ID },
      include: {
        product: {
          include: {
            images: true
          }
        }
      }
    });

    const fixedCart = cart.map(item => ({
      ...item,
      product: {
        ...item.product,
        price: Number(item.product.price)
      }
    }));

    res.json(fixedCart);

  } catch (err) {
    console.error("GET CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.addToCart = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    if (!productId) {
      return res.status(400).json({ error: "ProductId missing" });
    }

    console.log("Incoming:", req.body);

    const item = await prisma.cartItem.upsert({
      where: {
        userId_productId: {
          userId: USER_ID,
          productId: Number(productId)
        }
      },
      update: {
        quantity: {
          increment: Number(quantity)
        }
      },
      create: {
        userId: USER_ID,
        productId: Number(productId),
        quantity: Number(quantity)
      }
    });

    res.json(item);

  } catch (err) {
    console.error("ADD CART ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.updateCart = async (req, res) => {
  try {
    const { quantity } = req.body;

    const updated = await prisma.cartItem.update({
      where: { id: parseInt(req.params.id) },
      data: { quantity: Number(quantity) }
    });

    res.json(updated);

  } catch (err) {
    console.error("UPDATE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};

exports.removeFromCart = async (req, res) => {
  try {
    await prisma.cartItem.delete({
      where: { id: parseInt(req.params.id) }
    });

    res.json({ message: "Item removed" });

  } catch (err) {
    console.error("DELETE ERROR:", err);
    res.status(500).json({ error: err.message });
  }
};