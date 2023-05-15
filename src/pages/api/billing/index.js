const stripe = require("stripe")(
  process.env.STRIPE_SECRET_KEY
);

export default async function handler(req, res) {
  const body = JSON.parse(req.body)
  try {
    const loginLink = await stripe.accounts.createLoginLink(
      body.id
    );

    res.status(200).json({ url: loginLink.url });
  } catch (error) {
    console.error(error);
    console.log(error)
    res.status(500).json({ error: 'Unable to create account link.' });
  }
}