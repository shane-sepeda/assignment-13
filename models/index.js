// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

Product.belongsTo() {};

// Categories have many Products
Category.hasMany() {};
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany() {};
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany() {};

module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
