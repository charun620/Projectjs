const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.json());


const Product = require("./proctble"); // Import  Productproctble.js 
const ProductCompany = require("./compa"); // Import compa.js


Mongoose.connect(
  "mongodb://admin:yourpassword@ruk-com node",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

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



//Find company
app.get('/companies', async (req, res) => {
  try {
    const products = await ProductCompany.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
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
    Product.aggregate([
      {
        $group: {
          _id: "$CompanyID",
          totalStock: { $sum: "$StockQuantity" }
        }
      },
      {
        $project: {
          CompanyID: "$_id",
          CompanyQuantity: "$totalStock",
          _id: 0
        }
      }
    ]).then(result => {console.log(result);
      // you can update your ProductCompany collection with the calculated values
      // For example, you can loop through the result and update each company's CompanyQuantity
    }).catch(error => {
      console.error(error);
    });
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


//rerationships
Product.aggregate([
  {
    $group: {
      _id: "$CompanyID",
      totalStock: { $sum: "$StockQuantity" }
    }
  },
  {
    $project: {
      CompanyID: "$_id",
      CompanyQuantity: "$totalStock",
      _id: 0
    }
  }
]).then(result => {console.log(result);
  // you can update your ProductCompany collection with the calculated values
  // For example, you can loop through the result and update each company's CompanyQuantity
}).catch(error => {
  console.error(error);
});


app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});