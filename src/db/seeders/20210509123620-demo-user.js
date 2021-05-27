'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          id: 'ae7493c3-5976-4725-8270-79004a1599f0',
          login: 'JohnDoe',
          password: 'qwerty',
          age: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '9f6b8937-4ade-4eef-8a10-da677124c37e',
          login: 'nagibator',
          password: 'qwe123',
          age: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '667fbb60-0215-4079-84d7-41116632e9ca',
          login: 'nagibator666',
          password: 'q1w2e3',
          age: 16,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {
        ignoreDuplicates: true,
      },
    );
  },
  down: async (queryInterface, Sequelize) => {
    queryInterface.bulkDelete('users', null, {});
  },
};
