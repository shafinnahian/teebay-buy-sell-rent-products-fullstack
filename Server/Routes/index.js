import {Router} from "express"

import UserRoutes from './UserRoute.js';
import ProductRoutes from './ProductRoute.js';
import ProductSoldRoutes from './ProductSoldRoute.js';
import ProductRentRoutes from './ProductRentRoutes.js'

const route = Router();

route.use('/user', UserRoutes);
route.use('/product', ProductRoutes);
route.use('/product/sold', ProductSoldRoutes);
route.use('/product/rent', ProductRentRoutes);

export default route