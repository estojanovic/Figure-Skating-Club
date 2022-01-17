'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Trainings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Trainings.init({
    day: DataTypes.STRING,
    time: DataTypes.STRING,
    coach1: DataTypes.STRING,
    coach2: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Trainings',
  });
  return Trainings;
};