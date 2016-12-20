'use strict';

module.exports = function (sequelize, DataTypes) {
  const protector = sequelize.define('protector', {
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sex: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        protector.belongsToMany(models.child, { through: 'protectorChildRelationship', foreignKey: 'protectorId' });
      }
    }
  });

  return protector;
};
