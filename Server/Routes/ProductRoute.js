import {Router} from 'express';

import ProductController from '../Controller/ProductController.js';

const productController = new ProductController();

const route  = Router();

route.post('/createProduct/:userID', productController.createProduct);

route.get('/getAvailableProductList/:userID', productController.getProductsByType);
route.get('/getProductList/:userID', productController.getProductList_userID);
route.get('/getProduct/:productID', productController.getProductByID);

route.put('/updateProductInfo/:productID', productController.updateProductInformation);
route.put('/softDeleteProduct/:productID', productController.softDeleteProduct);

export default route;