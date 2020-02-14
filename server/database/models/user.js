export default (sequelize, DataTypes) => {
  const User = sequelize.define(
    'User',
    {
      firstName: DataTypes.STRING,
      lastName: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      isAdmin: DataTypes.BOOLEAN
    },
    {}
  );

  User.findByEmail = async email => {
    const user = await User.findOne({ where: { email } });
    if (user) return user.dataValues;
    return null;
  };

  User.associate = models => {
    User.belongsToMany(models.Product, {
      through: 'Cart',
      onDelete: 'CASCADE',
    });
  };

  return User;
};
