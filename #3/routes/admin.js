const path = require('path');

const adminController = require('../controller/admin')

const express = require('express');

const router = express.Router();

router.get('/add',adminController.getAddProds);

router.get('/edit-product/:productID', adminController.getEditProds);

router.get('/products',adminController.getProducts);

router.post('/add',adminController.addedProds);

router.post('/edit-product',adminController.postEditProduct);

router.post('/delete-product',adminController.postDeleteProduct);

module.exports = {router};