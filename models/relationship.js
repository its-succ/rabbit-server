'use strict';

module.exports = function (sequelize, DataTypes) {
  const relationship = sequelize.define('relationship', {
    name: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
      }
    }
  });

  return relationship;
};
