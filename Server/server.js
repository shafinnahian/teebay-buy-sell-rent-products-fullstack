import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';

import errorMiddleware from "./Middleware/ErrorMiddleware.js";

import UserRoutes from './Routes/UserRoute.js';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

dotenv.config()
const port = process.env.PORT;

app.use('/user', UserRoutes);

app.get('/', (req, res) => {
    // throw new Error('fake error');
    return res.send(`Backend Connected. Running on PORT ${port}`);
});

app.use(errorMiddleware);

app.listen(port, ()=> {
    console.log(`Server running on PORT: ${port}`);
})