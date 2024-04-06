const Product = require('../models/product');
const Cart = require('../models/cart');

exports.getProducts = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/product-list', {
      products,
      title: 'All Products',
      path: '/products',
    });
  });
};

exports.getProduct = (req, res, next) => {
  const prodId = req.params.productId;
  Product.findById(prodId, (product) => {
    res.render('shop/product-detail', {
      product,
      title: product.title,
      path: '/products',
    });
  });
};

exports.getIndex = (req, res, next) => {
  Product.fetchAll((products) => {
    res.render('shop/index', {
      products,
      title: 'Shop',
      path: '/',
    });
  });
};

exports.getCart = (req, res, next) => {
  Cart.getCart((cart) => {
    if (!cart) {
      return res.render('shop/cart', {
        path: '/cart',
        title: 'Your Cart',
        products: [],
      });
    }

    Product.fetchAll((products) => {
      const cartProducts = products.reduce((acc, product) => {
        const cartProductData = cart.products.find(
          (prod) => prod.id === product.id
        );
        if (cartProductData) {
          acc.push({ productData: product, qty: cartProductData.qty });
        }
        return acc;
      }, []);

      res.render('shop/cart', {
        path: '/cart',
        title: 'Your Cart',
        products: cartProducts,
      });
    });
  });
};

exports.postCart = (req, res, next) => {
  const prodId = req.body.productId;
  Product.findById(prodId, (product) => {
    Cart.addProduct(prodId, product.price);
  });
  res.redirect('/cart');
};

exports.getOrders = (req, res, next) => {
  res.render('shop/orders', {
    path: '/orders',
    title: 'Your Orders',
  });
};

exports.getCheckout = (req, res, next) => {
  res.render('shop.checkout', {
    path: '/checkout',
    title: 'Checkout',
  });
};
