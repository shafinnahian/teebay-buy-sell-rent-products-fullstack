import {Router} from "express"

import UserRoutes from './UserRoute.js';

const route = Router();

route.use('/user', UserRoutes);

export default route