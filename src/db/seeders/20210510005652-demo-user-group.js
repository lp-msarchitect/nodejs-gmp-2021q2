'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // await queryInterface.bulkInsert('user_groups', [], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_groups', null, {});
  },
};
