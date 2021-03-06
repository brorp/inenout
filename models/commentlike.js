'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CommentLike extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CommentLike.belongsTo(models.User, { foreignKey: 'userId'})
      CommentLike.belongsTo(models.Comment, { foreignKey: 'commentId'})
    }
  };
  CommentLike.init({
    commentId: DataTypes.INTEGER,
    userId:DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'CommentLike',
  });
  return CommentLike;
};