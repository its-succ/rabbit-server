'use strict';

const tableName = 'protectorChildRelationships';

module.exports = {
  up: function (queryInterface, Sequelize) {
    const attributes = {
      protectorId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'protectors',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      childId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'children',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      },
      relationshipId: {
        allowNull: false,
        type: Sequelize.INTEGER,
        references: {
          model: 'relationship',
          key: 'id',
          deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE
        }
      }
    };
    return queryInterface.sequelize.transaction(t => {
      return queryInterface.createTable(tableName, attributes, {
        comment: '保護者-園児',
        transaction: t
      });
    });
  },

  down: function (queryInterface, Sequelize) {
    return queryInterface.dropTable(tableName);
  }
};
