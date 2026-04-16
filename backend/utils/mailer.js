const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

const sendOrderEmail = async (to, order) => {
    const itemsHtml = order.items
        .map(
            (item) => `
      <li>
        ${item.product.name} (x${item.quantity}) - ₹${item.priceAtTime}
      </li>`
        )
        .join("");

    const mailOptions = {
        from: `"Flipkart Clone" <${process.env.EMAIL_USER}>`,
        to,
        subject: "🛒 Order Confirmation",
        html: `
      <h2>Order Placed Successfully 🎉</h2>
      <p><strong>Order ID:</strong> ${order.id}</p>
      <p><strong>Total:</strong> ₹${order.totalAmount}</p>

      <h3>Items:</h3>
      <ul>${itemsHtml}</ul>

      <p>🚚 Delivery in 2-3 days</p>
      <br/>
      <p>Thank you for shopping with us!</p>
    `
    };

    await transporter.sendMail(mailOptions);
};

module.exports = sendOrderEmail;