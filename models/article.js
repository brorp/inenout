'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Article extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Article.belongsTo(models.User, { foreignKey: "userId" });
      Article.hasMany(models.Comment, { foreignKey: "articleId" })
      Article.hasOne(models.Banner, { foreignKey: "articleId" });
      Article.hasOne(models.FeaturedArticle, { foreignKey: "articleId" });
      Article.hasMany(models.ArticleSection, { foreignKey: "articleId" });
      Article.belongsTo(models.SubCategory, { foreignKey: "tag" })
    }
  };
  Article.init({
    title: DataTypes.STRING,
    tag: DataTypes.INTEGER,
    content: DataTypes.TEXT,
    imgThumbnail: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Mohon masukkan gambar',
        },
        notEmpty: {
          msg: 'Mohon masukkan gambar',
        }
      },
    },
    img: {
      type: DataTypes.STRING(1000),
      allowNull: false,
      validate: {
        notNull: {
          msg: 'Mohon masukkan gambar',
        },
        notEmpty: {
          msg: 'Mohon masukkan gambar',
        }
      },
    },
    status: DataTypes.STRING,
    publishedAt: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, { 
    sequelize,
    modelName: 'Article',
  });
  return Article;
};