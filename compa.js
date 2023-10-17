const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());
  
  const ProductCompany = Mongoose.model("ProductCompany", {
    CompanyID: { type: Number, unique: true, require: true},
    CompanyName: String,
    CompanyQuantity: Number
  });


  
  module.exports = ProductCompany;