// const express=require("express")
// const { codeconverter, codeDebugger } = require("../controller/codeconvert.controller")
// const codeRoute=express.Router()

// codeRoute.post("/convert",codeconverter)
// codeRoute.post("/debug",codeDebugger)

// module.exports={
//     codeRoute
// }
const express = require('express');
const { codeConverter, codeDebugger } = require('../controller/codeconvert.controller');
const codeRoute = express.Router();

codeRoute.post('/convert', codeConverter);
codeRoute.post('/debug', codeDebugger);

module.exports = {
  codeRoute,
};
