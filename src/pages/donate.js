import { NextPage } from 'next';
import Layout from '../components/Layout';

import CheckoutForm from '../components/checkoutForm';

const DonatePage = () => {
  return (
    <Layout title="Donate with Checkout | Next.js + TypeScript Example">
      <div className="page-container" style={{paddingTop: 100}}>
        <h1>Donate with Checkout</h1>
        <p>Donate to our project 💖</p>
        <CheckoutForm />
      </div>
    </Layout>
  );
};

export default DonatePage;