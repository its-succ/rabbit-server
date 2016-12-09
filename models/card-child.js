'use strict';

module.exports = function (sequelize, DataTypes) {
  const child = sequelize.define('cardChild', {
  }, {
    classMethods: {
      associate: function (models) {
      }
    }
  });

  return child;
};
