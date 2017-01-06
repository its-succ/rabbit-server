'use strict';

module.exports = function (sequelize, DataTypes) {
  const protectorChildRelationship = sequelize.define('protectorChildRelationship', {
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
        protectorChildRelationship.belongsTo(models.relationship)
      }
    }
  });

  return protectorChildRelationship;
};
