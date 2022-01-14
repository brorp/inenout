'use strict';
const {
  Model
} = require('sequelize');
const {getSalt} = require('../helpers/bcrypt')
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasMany(models.Article, { foreignKey: "userId"})
      User.hasMany(models.Comment, { foreignKey: "userId" })
      User.hasMany(models.SubmittedArticle, { foreignKey: "userId" })
    }
  };
  User.init({
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: {
        args: true,
        msg: 'Username must be unique',
      },
      validate: {
        notNull: {
          msg: 'Username harus diisi',
        },
        notEmpty: {
          msg: 'Username harus diisi',
        },
      },
    },
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
    phoneNumber: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nomor telepon harus diisi',
        },
        notEmpty: {
          msg: 'Nomor telepon harus diisi',
        },
        len: {
          args: [0, 15],
          msg: 'Nomor maksimal 15 digit',
        },
      },
    },
    fullName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Nomor telepon harus diisi',
        },
        notEmpty: {
          msg: 'Nomor telepon harus diisi',
        },
        len: {
          args: [0, 15],
          msg: 'Nomor maksimal 15 digit',
        },
      },
    },
    profilePic: DataTypes.STRING,
    role: DataTypes.STRING,
    status: DataTypes.STRING,
    isSubscribed: DataTypes.BOOLEAN
  }, { hooks: {
    beforeCreate: (user) => {
      user.password = getSalt(user.password)
      user.status = "Inactive"
    }
  },
    sequelize,
    modelName: 'User',
  });
  return User;
};