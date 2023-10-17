const mongoose = require('mongoose');

const productCompanyRelationSchema = new mongoose.Schema({
  ProductID: { type: mongoose.Schema.Types.Number, ref: 'Product' },
  CompanyID: { type: mongoose.Schema.Types.Number, ref: 'ProductCompany' }
});

const ProductCompanyRelation = mongoose.model('ProductCompanyRelation', productCompanyRelationSchema);


module.exports = ProductCompanyRelation;
