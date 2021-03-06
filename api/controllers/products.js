import Product from '../models/Product.js';

// get product
export const getProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    console.log(product);
    if (!product) {
      return new ErrorResponse('product not found', 404);
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json(error);
  }
};

// get products
export const getProducts = async (req, res) => {
  try {
    const pageSize = 10;
    const page = Number(req.query.pageNumber) || 1;

    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: 'i',
          },
        }
      : {};

    // const count = await Product.countDocuments({ ...keyword });
    const products = await Product.find({ ...keyword });
    // .limit(pageSize)
    // .skip(pageSize * (page - 1));
    // res.json({ products, page, pages: Math.ceil(count / pageSize) });

    res.status(200).json(products);
  } catch (error) {
    res.status(500).json(error);
  }
};

//create product

export const createProduct = async (req, res) => {
  try {
    const product = new Product({
      ...req.body.product,
    });

    const savedProduct = await product.save();

    res.status(200).json({
      success: true,
      message: `Product has been added successfully!`,
      product: savedProduct,
    });
  } catch (error) {
    console.log(error);
    return next(
      new ErrorResponse(
        'Your request could not be processed. Please try again.',
        400
      )
    );
  }
};

//update Produt

export const updateProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, {
      $set: req.body.product,
    });
    res.status(200).json({
      success: true,
      message: 'Product has been edited successfully',
      product: { ...product._doc, ...req.body.product },
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// delete user
export const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    res.status(200).json({
      success: true,
      message: 'Product has been deleted',
      id: req.params.id,
    });
  } catch (err) {
    return res.status(500).json(err);
  }
};

// create a review
export const createProductReview = async (req, res) => {
  const { rating, comment } = req.body.review;

  const product = await Product.findById(req.params.id);

  if (product) {
    const alreadyReviewed = product.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );

    if (alreadyReviewed) {
      res.status(400).error('Product already reviewed');
    }

    const review = {
      username: req.user.username,
      rating: Number(rating),
      comment,
      user: req.user._id,
    };

    product.reviews.push(review);

    product.numReviews = product.reviews.length;

    product.rating =
      product.reviews.reduce((acc, item) => item.rating + acc, 0) /
      product.reviews.length;

    const newProduct = await product.save();
    const newReview = newProduct.reviews.find(
      (r) => r.user.toString() === req.user._id.toString()
    );
    res.status(201).json(newReview);
  } else {
    res.status(404).jason({ message: 'Already reviewed' });
  }
};

// const unusedCode = () => {
// if (!sku) {
//     return res.status(400).json({ error: 'You must enter sku.' });
//   }
//   if (!description || !name) {
//     return res
//       .status(400)
//       .json({ error: 'You must enter description & name.' });
//   }
//   if (!quantity) {
//     return res.status(400).json({ error: 'You must enter a quantity.' });
//   }
//   if (!price) {
//     return res.status(400).json({ error: 'You must enter a price.' });
//   }
//   const foundProduct = await Product.findOne({ sku });
//   if (foundProduct) {
//     return res.status(400).json({ error: 'This sku is already in use.' });
//   }
//   let imageUrl = '';
//   let imageKey = '';
//   if (image) {
//     const s3bucket = new AWS.S3({
//       accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//       secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//       region: process.env.AWS_REGION,
//     });
//     const params = {
//       Bucket: process.env.AWS_BUCKET_NAME,
//       Key: image.originalname,
//       Body: image.buffer,
//       ContentType: image.mimetype,
//       ACL: 'public-read',
//     };
//     const s3Upload = await s3bucket.upload(params).promise();
//     imageUrl = s3Upload.Location;
//     imageKey = s3Upload.key;
// }
// };
