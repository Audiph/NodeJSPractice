const Product = require('../models/product');

exports.getAddProduct = (req, res, next) => {
  res.render('admin/add-product', {
    title: 'Add Product',
    path: '/admin/add-product',
    formsCSS: true,
    productCSS: true,
    activeProduct: true,
  });
};

exports.postAddProduct = (req, res, next) => {
  const shopItem = req.body;
  const product = new Product(shopItem);
  product.save();
  res.redirect('/');
};

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('admin/products', {
      products,
      title: 'Admin Products',
      path: '/admin/products',
    });
  });
};
