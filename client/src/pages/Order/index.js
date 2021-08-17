import React from 'react';
import { useSelector } from 'react-redux';
import { AnimatePresence } from 'framer-motion';
import Product from '../../features/product/Product';
import CheckoutSummary from '../../components/CheckoutSummary';
import CheckoutSteps from '../../components/CheckoutSteps';
import './index.scss';
import { Link } from 'react-router-dom';

const Order = () => {
  let products = useSelector((state) => state.cart.data);
  let { address, city, postalCode, country } = useSelector(
    (state) => state.cart.shippingData
  );
  let paymentMethod = useSelector((state) => state.cart.paymentMethod);

  // total price
  const total =
    products.length > 0 &&
    products
      .reduce((a, p) => {
        return a + p.price * p.qty;
      }, 0)
      .toFixed(2);
  // total items
  const totalItems = products.length;

  const isData = products.length > 0;
  return (
    <div className='order-page'>
      <CheckoutSteps />
      <div className='order-page-inner'>
        <div className='left'>
          <div className='shipping'>
            <h3>Shipping :</h3>
            {`${address} ${city} ${postalCode} ${country}`}
          </div>
          <div className='payment-method'>
            <h3>Payment Method :</h3>
            {`${paymentMethod}`}
          </div>
          {isData && (
            <div className='order-page-products'>
              <h3>Order Units :</h3>
              <AnimatePresence>
                {products.map((product) => (
                  <Product key={product._id} product={product} />
                ))}
              </AnimatePresence>
            </div>
          )}
        </div>
        {isData && (
          <CheckoutSummary total={total} totalItems={totalItems}>
            <Link to='/shipping' className='btn checkout-btn'>
              Place Order
            </Link>
          </CheckoutSummary>
        )}
      </div>
    </div>
  );
};

export default Order;