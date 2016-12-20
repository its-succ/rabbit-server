'use strict';

const tableName = 'relationships';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const attributes = {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull: false,
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    };
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.createTable(tableName, attributes, {
        comment: '続柄',
        transaction: t
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName);
  }
};
