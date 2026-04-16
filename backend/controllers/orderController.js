const prisma = require('../config/prisma');
const sendOrderEmail = require('../utils/mailer');

const USER_ID = 1;

exports.placeOrder = async (req, res) => {
  try {
    const { shippingAddress, email } = req.body;

    if (!shippingAddress || !email) {
      return res.status(400).json({
        message: "Address and email are required"
      });
    }

    const cartItems = await prisma.cartItem.findMany({
      where: { userId: USER_ID },
      include: {
        product: true
      }
    });

    if (cartItems.length === 0) {
      return res.status(400).json({ message: "Cart is empty" });
    }

    const total = cartItems.reduce(
      (sum, item) =>
        sum + Number(item.product.price) * item.quantity,
      0
    );

    const order = await prisma.$transaction(async (tx) => {


      const newOrder = await tx.order.create({
        data: {
          userId: USER_ID,
          shippingAddress,
          totalAmount: total,
          items: {
            create: cartItems.map(item => ({
              productId: item.productId,
              quantity: item.quantity,
              priceAtTime: item.product.price
            }))
          }
        },
        include: {
          items: {
            include: {
              product: true
            }
          }
        }
      });

      for (let item of cartItems) {
        await tx.product.update({
          where: { id: item.productId },
          data: {
            stockQuantity: {
              decrement: item.quantity
            }
          }
        });
      }

      await tx.cartItem.deleteMany({
        where: { userId: USER_ID }
      });

      return newOrder;
    });
    await sendOrderEmail(email, order);

    res.json({
      message: "Order placed successfully",
      order
    });

  } catch (error) {
    console.error("ORDER ERROR:", error);
    res.status(500).json({ error: error.message });
  }
};