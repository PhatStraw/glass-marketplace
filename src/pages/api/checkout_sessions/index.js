import { NextApiRequest, NextApiResponse } from 'next'

import { formatAmountForStripe } from '../../../utils/stripe-helpers'
const EasyPostClient = require('@easypost/api');

const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

import Stripe from 'stripe'
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
  // https://github.com/stripe/stripe-node#configuration
  apiVersion: '2020-08-27',
})

export default async function handler(
  req,
  res
) {
  if (req.method === 'POST') {
    const { amount, accountId, shipping, name } = req.body
    try {

      // Create Checkout Sessions from body params.
      const params = {
        mode: 'payment',
        payment_method_types: ['card'],
        shipping_address_collection: {
          allowed_countries: ['US', 'CA'],
        },
        shipping_options: [
         {
            shipping_rate_data: {
              type: 'fixed_amount',
              fixed_amount: {amount: shipping, currency: 'usd'},
              display_name: 'Next day air',
              delivery_estimate: {
                minimum: {unit: 'business_day', value: 1},
                maximum: {unit: 'business_day', value: 1},
              },
            },
          },
        ],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: name,
              },
              unit_amount: formatAmountForStripe(amount, "USD"),
            },
            quantity: 1,
          }
        ],
        payment_intent_data: {
          transfer_data: {destination: accountId},
        },
        success_url: `${req.headers.origin}?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      }
      const checkoutSession =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession);
    } catch (err) {
      const errorMessage =
        err instanceof Error ? err.message : 'Internal server error'
      res.status(500).json({ statusCode: 500, message: errorMessage })
    }
  } else {
    res.setHeader('Allow', 'POST')
    res.status(405).end('Method Not Allowed')
  }
}