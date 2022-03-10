'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Courses extends Sequelize.Model {}
  Courses.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    title: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
    },
    estimatedTime: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    materialsNeeded: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, { sequelize });

  Courses.associate = (models) => {
    Courses.belongsTo(models.Users);
  }

  return Courses;
}
