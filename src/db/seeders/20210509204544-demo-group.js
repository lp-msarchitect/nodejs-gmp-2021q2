'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'groups',
      [
        {
          id: '1c2948ce-41c9-4a09-8869-0b3783761454',
          name: 'admins',
          permissions: queryInterface.sequelize.literal(
            `ARRAY['READ', 'WRITE', 'DELETE', 'SHARE', 'UPLOAD_FILES']::"enum_groups_permissions"[]`,
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          id: '3bfd25f6-f237-4469-aa3e-f1f183fc02e5',
          name: 'users',
          permissions: queryInterface.sequelize.literal(
            `ARRAY['READ', 'SHARE', 'UPLOAD_FILES']::"enum_groups_permissions"[]`,
          ),
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {},
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('groups', null, {});
  },
};
