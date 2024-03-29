import {Router} from "express"

import UserRoutes from './UserRoute.js';
import ProductRoutes from './ProductRoute.js';

const route = Router();

route.use('/user', UserRoutes);
route.use('/product', ProductRoutes);

export default route