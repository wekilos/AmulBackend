"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      this.hasMany(models.Img);
      this.belongsTo(models.Category);
      this.belongsTo(models.Color);
      this.belongsTo(models.Material);
      this.belongsTo(models.Length);
      this.belongsTo(models.Width);
    }
  }
  Product.init(
    {
      name_en: DataTypes.STRING,
      name_ru: DataTypes.STRING,
      code: DataTypes.STRING,
      description_en: DataTypes.TEXT,
      description_ru: DataTypes.TEXT,
      razmer_en: DataTypes.TEXT,
      razmer_ru: DataTypes.TEXT,
    },
    {
      sequelize,
      modelName: "Product",
    }
  );
  return Product;
};
