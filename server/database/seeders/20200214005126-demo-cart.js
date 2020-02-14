export default {
  up: (queryInterface) => queryInterface.bulkInsert('Carts', [
    {
      ProductId: 5,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 8,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 5,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 20,
      UserId: 1,
      createdAt: new Date(),
      updatedAt: new Date()
    },
    {
      ProductId: 15,
      UserId: 2,
      createdAt: new Date(),
      updatedAt: new Date()
    }
  ], {}),

  down: (queryInterface) => queryInterface.bulkDelete('Carts', null, {})
};
