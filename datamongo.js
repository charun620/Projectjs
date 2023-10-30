const express = require("express");
const Mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
app.use(bodyParser.json());

const Product = require("./proctble"); // Import  Productproctble.js
const ProductCompany = require("./compa"); // Import compa.js
const ProductCompanyRelation = require("./rera");

Mongoose.connect(
  "mongodb://admin:AYObih54131@node52305-chern.proen.app.ruk-com.cloud:11550",
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  }
);

// Get all products
app.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Get a specific product by ProductID
app.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOne({ ProductID: req.params.id });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create a new product
app.post("/products", async (req, res) => {
  try {
    const product = await Product.create(req.body);
    
    const newRelation = new ProductCompanyRelation({
      ProductID: product.ProductID, // Use the ID of the newly created product
      CompanyID: req.body.CompanyID, // Assuming CompanyID is available in req.body
    });

    await newRelation.save(); // Save the relation to the database

    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a product
app.put("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndUpdate(
      { ProductID: req.params.id },
      req.body,
      { new: true }
    );
    res.json(product);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a product
app.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findOneAndDelete({
      ProductID: req.params.id,
    });
    res.json(product);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

//Find company
app.get("/companies", async (req, res) => {
  try {
    const products = await ProductCompany.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get a specific company by CompanyID
app.get("/companies/:id", async (req, res) => {
  try {
    const company = await ProductCompany.findOne({ CompanyID: req.params.id });
    res.json(company);
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
});

// Create a new company
app.post("/companies", async (req, res) => {
  try {
    const company = await ProductCompany.create(req.body);
    const newRelation = new ProductCompanyRelation({
      ProductID: company.ProductID, // Assuming ProductID is available in req.body
      CompanyID: company.CompanyID, // Use the ID of the newly created company
    }); newRelation.save();
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Update a company
app.put("/companies/:id", async (req, res) => {
  try {
    const company = await ProductCompany.findOneAndUpdate(
      { CompanyID: req.params.id },
      req.body,
      { new: true }
    );
    res.json(company);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete a company
app.delete("/companies/:id", async (req, res) => {
  try {
    const company = await ProductCompany.findOneAndDelete({
      CompanyID: req.params.id,
    });
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
      totalStock: { $sum: "$StockQuantity" },
    },
  },
  {
    $project: {
      CompanyID: "$_id",
      CompanyQuantity: "$totalStock",
      _id: 0,
    },
  },
])
  .then((result) => {
    console.log(result);
    // you can update your ProductCompany collection with the calculated values
    // For example, you can loop through the result and update each company's CompanyQuantity
  })
  .catch((error) => {
    console.error(error);
  });

  async function collectDataAndStoreInRelationTable() {
    try {
      // Retrieve data from the first table (Product)
      const productData = await Product.find({}, 'ProductID CompanyID');
  
      // Retrieve data from the second table (ProductCompany)
      const companyData = await ProductCompany.find({}, 'CompanyID');
  
      // Process the data and create entries for the ProductCompanyRelation table
      const relations = [];
      productData.forEach(product => {
        companyData.forEach(company => {
          const relation = {
            ProductID: product.ProductID,
            CompanyID: company.CompanyID
          };
          relations.push(relation);
        });
      });
  
      // Insert data into the ProductCompanyRelation table
      await ProductCompanyRelation.insertMany(relations);
  
      console.log('Data inserted into ProductCompanyRelation collection.');
    } catch (error) {
      console.error(error);
    } 
  }
  
  collectDataAndStoreInRelationTable();

app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
