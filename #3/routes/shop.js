const path = require('path');

const shopChontroller = require('../controller/shop')

const express = require('express');

const router = express.Router();

router.get('/',shopChontroller.getIndex);

router.get('/products',shopChontroller.getProducts);

router.get('/cart',shopChontroller.getCart);

router.post('/cart',shopChontroller.postCart);

router.post('/cart-delete-item',shopChontroller.postCartDeleteProduct);

router.get('/products/:productID',shopChontroller.getProduct)

router.get('/orders',shopChontroller.getOrders);

router.get('/checkout',shopChontroller.getCheckout);

module.exports = router;
