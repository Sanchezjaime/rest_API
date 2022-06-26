'use strict';
const { Model } = require("sequelize");
const bcrypt = require('bcrypt');
const Sequelize = require('sequelize');

//model layout
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
      validate: {
        notNull: {
          msg: "A title is required."
        },
        notEmpty: {
          msg: "A title is required."
        }
      }
    },
    description: {
      type: Sequelize.TEXT,
      allowNull: false,
      validate: {
        notNull: {
          msg: "A description is required."
        },
        notEmpty: {
          msg: "A description is required."
        }
      }
    },
    estimatedTime: {
      type: Sequelize.STRING,
    },
    materialsNeeded: {
      type: Sequelize.STRING,
    },
  }, { sequelize });

  Courses.associate = (models) => {
    Courses.belongsTo(models.Users, {
      foreignKey: {
        fieldName: 'userId',
        allowNull: false,
      }
    })
  }

  return Courses;
};
