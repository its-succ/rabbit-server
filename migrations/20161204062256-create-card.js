'use strict';

const tableName = 'card';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const attributes = {
      id: {
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      cardNumber: {
        allowNull: false,
        type: Sequelize.STRING,
        unique: true
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
        comment: 'カード',
        transaction: t
      }).then(() => {
        return queryInterface.addIndex(tableName, ['cardNumber'], {
          indicesType: 'UNIQUE',
          transaction: t
        });
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.dropTable(tableName).then(() => {
        return queryInterface.removeIndex(tableName, ['cardNumber'], {transaction: t, indicesType: 'UNIQUE'})
      });
    });
  }
};
