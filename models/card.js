'use strict';

module.exports = function (sequelize, DataTypes) {
  const card = sequelize.define('card', {
    cardNumber: {
      allowNull: false,
      type: DataTypes.STRING
    }
  }, {
    classMethods: {
      associate: function (models) {
        card.belongsToMany(models.child, { through: 'cardChild', foreignKey: 'cardId' });
      }
    }
  });

  return card;
};
