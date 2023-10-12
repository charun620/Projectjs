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

//   // Get a specific company by CompanyID
// app.get('/companies/:id', async (req, res) => {
//     try {
//       const company = await ProductCompany.findOne({ CompanyID: req.params.id });
//       res.json(company);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   });
  
//   // Create a new company
//   app.post('/companies', async (req, res) => {
//     try {
//       const company = await ProductCompany.create(req.body);
//       res.json(company);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
//   // Update a company
//   app.patch('/companies/:id', async (req, res) => {
//     try {
//       const company = await ProductCompany.findOneAndUpdate({ CompanyID: req.params.id }, req.body, { new: true });
//       res.json(company);
//     } catch (error) {
//       res.status(400).json({ message: error.message });
//     }
//   });
  
//   // Delete a company
//   app.delete('/companies/:id', async (req, res) => {
//     try {
//       const company = await ProductCompany.findOneAndDelete({ CompanyID: req.params.id });
//       res.json(company);
//     } catch (error) {
//       res.status(404).json({ message: error.message });
//     }
//   });

  
  module.exports = ProductCompany;