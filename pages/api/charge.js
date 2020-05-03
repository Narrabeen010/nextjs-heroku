import Stripe from "stripe";
// don't commit your real stripe secret key... use env variables!!
// https://www.leighhalliday.com/secrets-env-vars-nextjs-now
const stripe = new Stripe("sk_test_ZFPuvtaPGandTE3AI6fSn9VY");

export default async (req, res) => {
  const { id, amount } = req.body;

  try {
    const payment = await stripe.paymentIntents.create({
      amount,
      currency: "USD",
      description: "Delicious empanadas",
      payment_method: id,
      confirm: true,
    });

    console.log(payment);

    return res.status(200).json({
      confirm: "abc123",
    });
  } catch (error) {
    console.log(error);
    return res.status(400).json({
      message: error.message,
    });
  }
};
