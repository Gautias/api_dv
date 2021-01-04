import bodyParser from "body-parser";
import { config } from "dotenv";
import express from "express";
import cors from "cors";
import { AuthentificationRoute } from "./src/routes/AuthentificationRoute";
import Utilisateur from './src/models/Utilisateur';
import AuthController from "./src/controller/AuthController";



config(); //process.env

const app = express();

app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/auth', AuthentificationRoute);

app.listen(process.env.PORT, () => {
    console.log(`Server run to http://localhost:${process.env.PORT}`);
})

console.log(AuthController.login);
