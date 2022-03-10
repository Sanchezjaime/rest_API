'use strict';
const Sequelize = require('sequelize');

module.exports = (sequelize) => {
  class Users extends Sequelize.Model {}
  Users.init({
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    firstName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
    },
  }, { sequelize });

  Users.associate = (models) => {
    Users.hasMany(models.Courses);
  }

  return Users;
}
