import express from "express";
import bodyParser from "body-parser";
//import dotenv from "dotenv"; //help us use process.env.
import viewEngine from "./config/viewEngine";
import initWebRoutes from "./route/web";
import connectDB from "./config/connectDB";
import cors from 'cors';

require("dotenv").config();

let app = express(); // instance of app express

// app.use(cors());
// app.use(function (req, res, next) {
//     res.setHeader('Access-Control-Allow-Origin', process.env.URL_REACT);
//     res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
//     res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
//     res.setHeader('Access-Control-Allow-Credentials', true);
//     next();
// });


const corsOptions = {
    origin: process.env.URL_REACT,
    credentials: true,            //access-control-allow-credentials:true
    optionSuccessStatus: 200
}
app.use(cors(corsOptions));


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));
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
    console.log("Backend NodeJS is running with Postgres Database ");
    console.log("Backend NodeJS is running with port: " + port);
});