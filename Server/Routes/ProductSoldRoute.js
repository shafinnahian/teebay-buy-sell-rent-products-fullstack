import {Router} from 'express';

import ProductSoldController from '../Controller/ProductSoldController.js';

const route = Router();

const productSoldController = new ProductSoldController();

route.post('/sellProduct', productSoldController.sellProduct);

export default route;