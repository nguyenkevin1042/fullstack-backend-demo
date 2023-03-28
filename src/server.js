import express from "express";
import bodyParser from "body-parser";
//import dotenv from "dotenv"; //help us use process.env.
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';

require("dotenv").config();

let app = express(); // instance of app express

const corsOptions = {
    origin: 'http://localhost:3000',
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));

//config app
//1. config parameters from client
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

viewEngine(app);
initWebRoutes(app);

connectDB();

//2. run app
// dotenv.config();

let port = process.env.port || 8000;
app.listen(port, () => {
    console.log("Backend NodeJS is running with port: " + port);
});