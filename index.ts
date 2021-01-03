import bodyParser from "body-parser";
import { config, parse } from "dotenv";
import express from "express";
import cors from "cors";

import { AuthentificationRoute } from "./src/routes/AuthentificationRoute";
import { json } from 'body-parser';

config(); //process.env
const app = express();

app.use(express.urlencoded({ extended: true }));
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/auth', AuthentificationRoute);

app.listen(8080, () => {
    console.log(`Server run to http://localhost:8080`);
})