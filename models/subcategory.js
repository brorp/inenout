'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class SubCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      SubCategory.belongsTo(models.Category, { foreignKey: "categoryId" })
      SubCategory.hasMany(models.Article, { foreignKey: "tag" })
    }
  };
  SubCategory.init({
    name: DataTypes.STRING,
    categoryId: DataTypes.INTEGER
  }, { hooks: {
    beforeCreate: (subcategory) => {
      subcategory.status = "Active"
    }
  },
    sequelize,
    modelName: 'SubCategory',
  });
  return SubCategory;
};