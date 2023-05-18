"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Width extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Product);
    }
  }
  Width.init(
    {
      name: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Width",
    }
  );
  return Width;
};
