import UserController from '../Controller/UserController.js';

import express from "express";
const route = express.Router();

const userController = new UserController();

route.post('/registerUser', userController.registerUser);
route.post('/loginUser', userController.loginUser)

route.get('/getUser/:userID', userController.getUserInfo);

export default route;
