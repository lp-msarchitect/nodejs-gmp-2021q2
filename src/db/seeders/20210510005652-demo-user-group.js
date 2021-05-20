'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'user_groups',
      [
        {
          id: 'e479512e-2592-44ea-b2f3-5ab3476663da',
          userId: 'ae7493c3-5976-4725-8270-79004a1599f0',
          groupId: '3bfd25f6-f237-4469-aa3e-f1f183fc02e5',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_groups', null, {});
  },
};
