'use strict';
const { Model } = require('sequelize');
const bcrypt = require('bcrypt');
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
      validate: {
        notNull: {
          msg: 'A first name is required.'
        },
        notEmpty: {
          msg: 'Please provide first name.'
        },
      }
    },
    lastName: {
      type: Sequelize.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'A last name is required.'
        },
        notEmpty: {
          msg: 'Please provide a last name.'
        },
      }
    },
    emailAddress: {
      type: Sequelize.STRING,
      allowNull: false,
      unique: {
        msg: 'This email is already in use.'
      },
      validate: {
        isEmail: {
          msg: 'Please provide a valid email.'
        },
        notNull: {
          msg: 'Email required.'
        },
      }
    },
    password: {
      type: Sequelize.STRING,
      allowNull: false,
      set(val) {
        const hashedPassword = bcrypt.hasSync(val, 10);
        this.setDataValue('password', hashedPassword);
      },
      validate: {
        notNull: {
          msg: 'Password required.'
        },
        notEmpty: {
          msg: 'Please provide password.'
        },
      }
    },
  }, { sequelize });

  Users.associate = (models) => {
    Users.hasMany(models.Courses, {
      foreignKey: 'userId',
      allowNull: false,
    });
  }

  return Users;
}
