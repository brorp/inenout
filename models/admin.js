'use strict';
const {
  Model
} = require('sequelize');
const {getSalt} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class Admin extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Admin.init({
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Email must be unique',
      },
      validate: {
        notNull: {
          msg: 'Email harus diisi',
        },
        isEmail: {
          msg: 'Format email tidak valid',
        },
        notEmpty: {
          msg: 'Email harus diisi',
        },
      },
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Password harus diisi',
        },
        notEmpty: {
          msg: 'Password harus diisi',
        },
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nama lengkap harus diisi',
        },
        notEmpty: {
          msg: 'Nama lengkap harus diisi',
        },
      },
    },
    status: DataTypes.STRING
  }, { hooks: {
    beforeCreate: (user) => {
      user.password = getSalt(user.password)
      user.status = "Inactive"
    }
  },
    sequelize,
    modelName: 'Admin',
  });
  return Admin;
};