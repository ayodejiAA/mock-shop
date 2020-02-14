/* eslint-disable max-len */
// eslint-disable-next-line import/no-extraneous-dependencies
import faker from 'faker';

const randomProductsDetails = Array.from(Array(20), () => ({
  name: faker.commerce.productName(),
  description: faker.lorem.paragraph(),
  category: faker.commerce.product(),
  price: faker.commerce.price(),
  imageUrl: 'https://res.cloudinary.com/ayodejimage/image/upload/v1581626499/pq71e9le8vfczrfjhyfn.jpg',
  inStock: faker.random.boolean(),
  createdAt: new Date(),
  updatedAt: new Date()
}));

export default {
  up: queryInterface => queryInterface.bulkInsert('Products',
    randomProductsDetails, {}),

  down: queryInterface => queryInterface.bulkDelete('Products', null, {})
};
