import {Router} from 'express';

import ProductController from '../Controller/ProductController.js';

const productController = new ProductController();

const route  = Router();

route.post('/createProduct/:userID', productController.createProduct);

route.get('/getProductList', productController.getProductsByType);
route.get('/getProductList/:userID', productController.getProductList_userID);

route.put('/softDeleteProduct/:productID', productController.softDeleteProduct);

export default route;