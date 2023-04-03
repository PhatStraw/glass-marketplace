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
    const amount = req.body.amount
    try {

      // Create Checkout Sessions from body params.
      const params = {
        mode: 'payment',
        payment_method_types: ['card'],
        line_items: [
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: req.body.name,
              },
              unit_amount: formatAmountForStripe(amount, "USD"),
            },
            quantity: 1,
          },
          {
            price_data: {
              currency: 'usd',
              product_data: {
                name: 'Shipping Cost',
              },
              unit_amount: 500, // in cents
            },
            quantity: 1,
          },
        ],
        success_url: `${req.headers.origin}/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${req.headers.origin}/`,
      }
      const checkoutSession =
        await stripe.checkout.sessions.create(params)

      res.status(200).json(checkoutSession)
      // const shipment = await client.Shipment.create({
      //   from_address: {
      //     street1: '417 MONTGOMERY ST',
      //     street2: 'FLOOR 5',
      //     city: 'SAN FRANCISCO',
      //     state: 'CA',
      //     zip: '94104',
      //     country: 'US',
      //     company: 'EasyPost',
      //     phone: '415-123-4567',
      //   },
      //   to_address: {
      //     name: 'Dr. Steve Brule',
      //     street1: '179 N Harbor Dr',
      //     city: 'Redondo Beach',
      //     state: 'CA',
      //     zip: '90277',
      //     country: 'US',
      //     phone: '4155559999',
      //   },
      //   parcel: {
      //     length: 8,
      //     width: 5,
      //     height: 5,
      //     weight: 5,
      //   },
      // });
      
      // // const boughtShipment = await client.Shipment.buy(shipment.id, shipment.lowestRate());
      // console.log(shipment.lowestRate())
      // res.status(200).json(shipment.lowestRate());
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