const products = require('./data.json');
const axios = require('axios');
const newProducts = products.products.map((product) => {
  if (!product.details) {
    const { name, price, category, imageUrl, ...others } = product;
    product = { name, price, imageUrl, category, details: others };
  }
  return product;
});
console.log(newProducts[5]);

const seed = async () => await axios.post('/products', newProducts)();
products.products = newProducts;
