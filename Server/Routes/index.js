import {Router} from "express"

import UserRoutes from './UserRoute.js';
import ProductRoutes from './ProductRoute.js';
import ProductSoldRoutes from './ProductSoldRoute.js';

const route = Router();

route.use('/user', UserRoutes);
route.use('/product', ProductRoutes);
route.use('/product/sold', ProductSoldRoutes);

export default route