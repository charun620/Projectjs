const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


  const Product = Mongoose.model("Product", {
    ProductID: { type: Number, unique: true ,require: true },
    ProductName: String,
    CompanyID: { type: Number, ref: 'ProductCompany' },
    StockQuantity: Number});


  module.exports = Product;