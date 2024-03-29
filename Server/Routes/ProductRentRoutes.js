import {Router} from 'express';

import ProductRentController from '../Controller/ProductRentController.js';

const route = Router();

const productRentController = new ProductRentController();

route.post('/rentProduct', productRentController.rentProduct);

route.get('/getRentProduct/:rentFromID', productRentController.getRentedProduct_UserID);

route.put('/updateRentStatus/:productID', productRentController.updateRetrievalStatus);

export default route;