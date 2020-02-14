export default (sequelize, DataTypes) => {
  const Cart = sequelize.define('Cart', {
    ProductId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Products',
        key: 'id'
      }
    },
    UserId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Users',
        key: 'id'
      }
    }
  }, {});

  return Cart;
};
