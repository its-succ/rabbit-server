'use strict';

module.exports = function (sequelize, DataTypes) {
  const child = sequelize.define('cardChild', {
    first_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    last_name: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sex: {
      allowNull: false,
      type: DataTypes.STRING
    },
    birthday: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function (models) {
      }
    }
  });

  return child;
};
