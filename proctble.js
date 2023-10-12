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

//   // Get all products
// app.get('/products', async (req, res) => {
//     try {
//       const products = await Product.find();
//       res.json(products);
//     } catch (error) {
//       res.status(500).json({ message: error.message });
//     }
//   });
  
//   // Get a specific product by ProductID
//   app.get('/products/:id', async (req, res) => {
//     try {
//       const product = await Product.findOne({ ProductID: req.params.id });
//       res.json(product);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   });
  
//   // Create a new product
//   app.post('/products', async (req, res) => {
//     try {
//       const product = await Product.create(req.body);
//       res.json(product);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
//   // Update a product
//   app.patch('/products/:id', async (req, res) => {
//     try {
//       const product = await Product.findOneAndUpdate({ ProductID: req.params.id }, req.body, { new: true });
//       res.json(product);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
//   // Delete a product
//   app.delete('/products/:id', async (req, res) => {
//     try {
//       const product = await Product.findOneAndDelete({ ProductID: req.params.id });
//       res.json(product);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   });

  module.exports = Product;