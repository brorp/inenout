'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class FeaturedArticle extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      FeaturedArticle.belongsTo(models.Article, { foreignKey: "articleId" });    }
  };
  FeaturedArticle.init({
    title: DataTypes.STRING,
    caption: DataTypes.STRING,
    articleId: DataTypes.INTEGER,
    img: DataTypes.STRING,
    isHomepage: DataTypes.BOOLEAN,
    status: DataTypes.STRING
  }, { hooks: {
    beforeCreate: (featuredArticle) => {
      featuredArticle.status = "Active"
    }
  },
    sequelize,
    modelName: 'FeaturedArticle',
  });
  return FeaturedArticle;
};