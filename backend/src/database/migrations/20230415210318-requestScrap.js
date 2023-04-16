'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('requestScrap', {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      searchTerm: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      platform: {
        allowNull: false,
        type: Sequelize.TEXT
      },
      category: {
        allowNull: false,
        type: Sequelize.TEXT
      }
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('requestScrap');
  }
};
