'use strict';
module.exports = function(sequelize, DataTypes) {
  var adminUser = sequelize.define('adminUser', {
    userName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    lastName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    firstName: {
      allowNull: false,
      type: DataTypes.STRING
    },
    sex: {
      allowNull: false,
      type: DataTypes.STRING
    },
    password: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return adminUser;
};
