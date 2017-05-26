'use strict';
module.exports = function(sequelize, DataTypes) {
  var adminUsers = sequelize.define('adminUsers', {
    user_name: {
      allowNull: false,
      type: DataTypes.STRING
    },last_name: {
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
  return adminUsers;
};
