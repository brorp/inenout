'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubmittedArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubmittedArticle.belongsTo(models.User, { foreignKey: "userId" })
    }
  };
  SubmittedArticle.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Judul harus diisi',
        },
        notEmpty: {
          msg: 'Judul harus diisi',
        },
      },
    },
    attachment: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Mohon unggah file PDF berisi konten artikel anda',
        },
        notEmpty: {
          msg: 'Mohon unggah file PDF berisi konten artikel anda',
        },
      },
    },
    img: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Mohon unggah minimal 1 gambar (.PNG/.JPEG)',
        },
        notEmpty: {
          msg: 'Mohon unggah minimal 1 gambar (.PNG/.JPEG)',
        },
      },
    },
    userId: DataTypes.INTEGER,
    status: DataTypes.STRING
  }, { hooks: {
    beforeCreate: (submittedarticle) => {
      submittedarticle.status = "On Review"
    }
  },
    sequelize,
    modelName: 'SubmittedArticle',
  });
  return SubmittedArticle;
};