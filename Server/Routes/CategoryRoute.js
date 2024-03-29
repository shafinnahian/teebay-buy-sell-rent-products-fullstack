import {Router} from 'express';
import CategoryController from '../Controller/CategoryController.js';

const route = Router();

const categoryController = new CategoryController();

route.get('/getAll', categoryController.getAllCategory);

export default route;