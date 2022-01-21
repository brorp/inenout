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
    title: DataTypes.STRING,
    attachment: DataTypes.STRING,
    img: DataTypes.ARRAY(DataTypes.STRING),
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