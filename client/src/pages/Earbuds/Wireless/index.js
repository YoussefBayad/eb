import React, { useEffect } from 'react';
import Links from '../../../components/Links';
import Products from '../../../features/product/Product';

// redux
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../../redux/products/productsSlice';

const Wireless = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    if (data?.length > 0) return;
    dispatch(fetchProducts());
  }, []);
  const { data, loading } = useSelector((state) => state.products);

  return (
    <div className='shop'>
      <h1>Wireless Earbuds</h1>
      <Links filter='Earbuds' />
      <Products
        loading={loading}
        data={data.filter(
          (product) =>
            product.category === 'Earbuds' && product.wireless === 'true'
        )}
      />
    </div>
  );
};

export default Wireless;
