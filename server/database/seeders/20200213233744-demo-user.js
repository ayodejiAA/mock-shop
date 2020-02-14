import { hashPassword } from '../../helpers/encrypt';

export default {
  up: (queryInterface) => queryInterface.bulkInsert(
    'Users',
    [
      {
        firstName: 'Alina',
        lastName: 'Joy',
        email: 'user@gmail.com',
        password: hashPassword('password1Q'),
        isAdmin: false,
        createdAt: new Date(),
        updatedAt: new Date()
      },

      {
        firstName: 'Eagle',
        lastName: 'Eyes',
        email: 'admin@gmail.com',
        password: hashPassword('password1Q'),
        isAdmin: true,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ],
    {}
  ),

  down: queryInterface => queryInterface.bulkDelete('Users', null, {})
};
