import Stripe from "stripe";
import { prisma } from "../../utils/prisma-helper";
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2020-08-27",
  });
export default async function handler(req, res) {
    // create an account link using Stripe API
    const accountLink = await stripe.accountLinks.create({
      account: req.body.accountId,
      refresh_url: 'http://localhost:3000',
      return_url: 'http://localhost:3000',
      type: 'account_onboarding',
    });
  
    // get the user ID from the request or session
    const userEmail = req.body.userEmail;
  
    // update the user's accountLink field in Prisma
    const user = await prisma.user.update({
      where: { email: userEmail },
      data: { stripelink: accountLink.url },
    });
  
    res.status(200).json({ accountLink: accountLink.url });
  }
  