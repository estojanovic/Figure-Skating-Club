'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class PrivateLessons extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     static associate(models) {
      // define association here
      this.belongsTo(Users, {foreignKey: 'UserID', as: 'user'});
    }
  }
  PrivateLessons.init({
    day: DataTypes.STRING,
    time: DataTypes.STRING,
    coach: DataTypes.STRING,
    UserID:{
      type: DataTypes.INTEGER
    }
  }, {
    sequelize,
    modelName: 'PrivateLessons',
  });
  return PrivateLessons;
};