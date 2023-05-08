"use strict";

var _express = _interopRequireDefault(require("express"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//1. we need to import express 
// var express = require("express") (old syntax, not recommended)
// recommended

//2. create function for view engine
var configViewEngine = function configViewEngine(app) {
  // app: an instance, a server is an application
  app.use(_express["default"]["static"]("./src/public")); //static(): auto get files from a specific folder 
  app.set("view engine", "ejs"); // set view engine is ejs
  app.set("views", "./src/views"); //set links to get view engine
};

//3. export function so that other file can use this function
module.exports = configViewEngine;