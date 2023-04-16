'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('adverts', {
      id: {
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      request_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        onUpdate: 'CASCADE',
        onDelete: 'CASCADE',
        field: 'requestId',
        references: {
          model: 'requestScraps',
          key: 'id',
        }
      },
      title: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      price: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      description: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      image: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      link: {
        type: Sequelize.TEXT,
        allowNull: false,
      },
      platform: {
        type: Sequelize.TEXT,
        allowNull: false
      }
      });
  },

  down: async (queryInterface, Sequelize) => {
      await queryInterface.dropTable('adverts');
  }
};
