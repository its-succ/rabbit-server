'use strict';

module.exports = function (sequelize, DataTypes) {
  const child = sequelize.define('cardChild', {
  }, {
    timestamps: false,
    classMethods: {
      associate: function (models) {
      }
    }
  });

  return child;
};
