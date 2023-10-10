const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());

Mongoose.connect("mongodb://localhost:27018/warehouse_db", { useNewUrlParser: true, useUnifiedTopology: true });
// Mongoose.connect(
//   "mongodb://*********@node52305-chern.proen.app.ruk-com.cloud:11550",
//   {
//     useNewUrlParser: true,
//     useUnifiedTopology: true,
//   }
// );

const productSchema = new Mongoose.Schema({
  ProductID: { type: Number, unique: true },
  ProductName: String,
  CompanyID: { type: Number, ref: 'ProductCompany' },
  StockQuantity: Number
});

const Product = Mongoose.model("Product", productSchema);

// Define ProductCompany Schema
const productCompanySchema = new Mongoose.Schema({
  CompanyID: { type: Number, unique: true },
  CompanyName: String,
  CompanyQuantity: Number
});

const ProductCompany = Mongoose.model("ProductCompany", productCompanySchema);

// Create routes and start the server
// (You'll need to add routes for CRUD operations)

// Get all products
app.get('/products', async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific product by ProductID
app.get('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOne({ ProductID: req.params.id });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create a new product
app.post('/products', async (req, res) => {
  try {
    const product = await Product.create(req.body);
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
app.patch('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate({ ProductID: req.params.id }, req.body, { new: true });
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
app.delete('/products/:id', async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({ ProductID: req.params.id });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get a specific company by CompanyID
app.get('/companies/:id', async (req, res) => {
  try {
    const company = await ProductCompany.findOne({ CompanyID: req.params.id });
    res.json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create a new company
app.post('/companies', async (req, res) => {
  try {
    const company = await ProductCompany.create(req.body);
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a company
app.patch('/companies/:id', async (req, res) => {
  try {
    const company = await ProductCompany.findOneAndUpdate({ CompanyID: req.params.id }, req.body, { new: true });
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a company
app.delete('/companies/:id', async (req, res) => {
  try {
    const company = await ProductCompany.findOneAndDelete({ CompanyID: req.params.id });
    res.json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});