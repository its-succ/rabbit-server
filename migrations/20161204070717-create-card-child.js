'use strict';

const tableName = 'cardChild';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const attributes = {
      cardId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'card',
          // This is the column name of the referenced model
          key: 'id',
          // This declares when to check the foreign key constraint. PostgreSQL only.
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      childId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          // This is a reference to another model
          model: 'children',
          // This is the column name of the referenced model
          key: 'id',
          // This declares when to check the foreign key constraint. PostgreSQL only.
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    };
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.createTable(tableName, attributes, {
        comment: 'カード-園児',
        transaction: t
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName);
  }
};
