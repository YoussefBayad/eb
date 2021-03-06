import React, { useEffect } from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { Link, useParams } from 'react-router-dom';
import Links from '../../components/Links';
import Products from '../../features/product/Products';
import { fetchProducts } from '../../redux/products/productsSlice';
import './index.scss';

const Shop = () => {
  const dispatch = useDispatch();
  const { keyword } = useParams();

  const { data, loading, message } = useSelector((state) => state.products);

  useEffect(() => {
    if (!loading) {
      dispatch(fetchProducts(keyword));
    }
  }, [dispatch, keyword]);
  return (
    <div className='shop'>
      <h1>Shop</h1>
      <Links filter='Shop' />
      <Products data={data} loading={loading} message={message} />
      {data.length === 0 && (
        <h3 className='no-product-exist'>
          No product found with this name <Link to='/shop'>Back to Shop</Link>
        </h3>
      )}
    </div>
  );
};

export default Shop;
