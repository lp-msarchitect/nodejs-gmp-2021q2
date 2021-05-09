'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Users',
      [
        {
          id: 1,
          login: 'JohnDoe',
          password: 'qwerty',
          age: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          login: 'nagibator',
          password: 'qwe123',
          age: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 3,
          login: 'nagibator666',
          password: 'q1w2e3',
          age: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('Users', null, {});
  },
};
