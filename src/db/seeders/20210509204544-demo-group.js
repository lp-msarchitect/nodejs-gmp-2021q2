'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'Groups',
      [
        {
          id: 1,
          name: 'admins',
          permissions: queryInterface.sequelize.literal(
            `ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']::"enum_Groups_permissions"[]`,
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: 2,
          name: 'users',
          permissions: queryInterface.sequelize.literal(
            `ARRAY['READ', 'SHARE', 'UPLOAD_FILES']::"enum_Groups_permissions"[]`,
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Groups', null, {});
  },
};
