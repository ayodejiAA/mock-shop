
export default {
  up: (queryInterface, Sequelize) => queryInterface.createTable('Carts', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    ProductId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    UserId: {
      type: Sequelize.INTEGER,
      allowNull: false,
      onDelete: 'CASCADE'
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface) => queryInterface.dropTable('Carts')
};
