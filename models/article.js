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
    }
  };
  Article.init({
    title: DataTypes.STRING,
    tag: DataTypes.INTEGER,
    content: DataTypes.STRING,
    img: DataTypes.STRING,
    status: DataTypes.STRING,
    userId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Article',
  });
  return Article;
};