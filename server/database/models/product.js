export default (sequelize, DataTypes) => {
  const Product = sequelize.define('Product', {
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
    category: DataTypes.STRING,
    price: DataTypes.FLOAT,
    imageUrl: DataTypes.STRING,
    inStock: DataTypes.BOOLEAN
  }, {});


  Product.deleteById = (id) => Product.destroy({
    where: { id }
  });

  Product.associate = models => {
    Product.belongsToMany(models.User, { through: models.Cart });
  };

  return Product;
};
