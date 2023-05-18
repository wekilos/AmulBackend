"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Img extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.belongsTo(models.Product);
    }
  }
  Img.init(
    {
      img: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "Img",
    }
  );
  return Img;
};
