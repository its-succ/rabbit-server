'use strict';

module.exports = function (sequelize, DataTypes) {
  const child = sequelize.define('child', {
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
    },
    birthday: {
      allowNull: false,
      type: DataTypes.DATE
    }
  }, {
    classMethods: {
      associate: function (models) {
        child.belongsToMany(models.card, { through: 'cardChild', foreignKey: 'childId' });
      }
    }
  });

  return child;
};
