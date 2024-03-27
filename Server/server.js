import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import bodyParser from 'body-parser';

const app = express();
app.use(cors());

app.use(bodyParser.json());
app.use(express.json());

dotenv.config()
const port = process.env.PORT;

app.get('/', (req, res) => {
    return res.send(`Backend Connected. Running on PORT ${port}`);
});

app.listen(port, ()=> {
    console.log(`Server running on PORT: ${port}`);
})