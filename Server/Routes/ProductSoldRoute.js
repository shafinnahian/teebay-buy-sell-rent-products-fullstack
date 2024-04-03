import {Router} from 'express';

import ProductSoldController from '../Controller/ProductSoldController.js';

const route = Router();

const productSoldController = new ProductSoldController();

route.post('/sellProduct', productSoldController.sellProduct);

route.get('/getBoughtProducts/:buyerID', productSoldController.listBoughtProducts);
route.get('/getSoldProducts/:sellerid', productSoldController.listSoldProducts );

export default route;