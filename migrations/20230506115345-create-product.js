"use strict";
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("Products", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      name_en: {
        type: Sequelize.STRING,
      },
      name_ru: {
        type: Sequelize.STRING,
      },
      code: {
        type: Sequelize.STRING,
      },
      description_en: {
        type: Sequelize.TEXT,
      },
      description_ru: {
        type: Sequelize.TEXT,
      },
      razmer_en: {
        type: Sequelize.TEXT,
      },
      razmer_ru: {
        type: Sequelize.TEXT,
      },
      CategoryId: {
        type: Sequelize.INTEGER,
      },
      ColorId: {
        type: Sequelize.INTEGER,
      },
      LengthId: {
        type: Sequelize.INTEGER,
      },
      MaterialId: {
        type: Sequelize.INTEGER,
      },
      WidthId: {
        type: Sequelize.INTEGER,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable("Products");
  },
};
