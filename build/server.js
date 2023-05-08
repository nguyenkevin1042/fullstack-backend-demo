"use strict";

var _express = _interopRequireDefault(require("express"));
var _bodyParser = _interopRequireDefault(require("body-parser"));
var _viewEngine = _interopRequireDefault(require("./config/viewEngine"));
var _web = _interopRequireDefault(require("./route/web"));
var _connectDB = _interopRequireDefault(require("./config/connectDB"));
var _cors = _interopRequireDefault(require("cors"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }
//import dotenv from "dotenv"; //help us use process.env.

require("dotenv").config();
var app = (0, _express["default"])(); // instance of app express

var corsOptions = {
  origin: 'http://localhost:3000',
  credentials: true,
  //access-control-allow-credentials:true
  optionSuccessStatus: 200
};
app.use((0, _cors["default"])(corsOptions));
app.use(_bodyParser["default"].json({
  limit: '10mb'
}));
app.use(_bodyParser["default"].urlencoded({
  extended: true,
  limit: '10mb'
}));
//config app
//1. config parameters from client
app.use(_bodyParser["default"].json());
app.use(_bodyParser["default"].urlencoded({
  extended: true
}));
(0, _viewEngine["default"])(app);
(0, _web["default"])(app);
(0, _connectDB["default"])();

//2. run app
// dotenv.config();

var port = process.env.port || 8000;
app.listen(port, function () {
  console.log("Backend NodeJS is running with port: " + port);
});