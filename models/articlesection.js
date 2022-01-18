'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ArticleSection extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ArticleSection.belongsTo(models.Article, { foreignKey: "articleId" });
    }
  };
  ArticleSection.init({
    sectionTitle: DataTypes.STRING,
    sectionText: DataTypes.TEXT,
    sectionImg: DataTypes.STRING,
    articleId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'ArticleSection',
  });
  return ArticleSection;
};