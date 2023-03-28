//1. we need to import express 
// var express = require("express") (old syntax, not recommended)
import express from "express"; // recommended

//2. create function for view engine
let configViewEngine = (app) => { // app: an instance, a server is an application
    app.use(express.static("./src/public")); //static(): auto get files from a specific folder 
    app.set("view engine", "ejs");// set view engine is ejs
    app.set("views", "./src/views"); //set links to get view engine
}

//3. export function so that other file can use this function
module.exports = configViewEngine;