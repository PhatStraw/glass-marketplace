import Stripe from "stripe";
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
    // https://github.com/stripe/stripe-node#configuration
    apiVersion: "2020-08-27",
  });

export default async function handler(req, res) {
    const { accountId, email } = JSON.parse(req.body)
    try {
      const accountLink = await stripe.accountLinks.create({
        account: accountId, // Replace with your Stripe account ID
        refresh_url: 'http://localhost:3000/sell', // Replace with your refresh URL
        return_url: 'http://localhost:3000/sell', // Replace with your return URL
        type: 'account_onboarding',
      });

      const user = await prisma.user.update({
        where: { email },
        data: { stripelink: accountLink.url },
      });
  
      res.status(200).json({ url: accountLink.url, user });
    } catch (error) {
      console.error(error);
      console.log(error)
      res.status(500).json({ error: 'Unable to create account link.' });
    }
  }