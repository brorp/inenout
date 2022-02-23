'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Banner extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {}
  };
  Banner.init({
    title: DataTypes.STRING,
    imgBanner: DataTypes.STRING,
    urlBanner: DataTypes.STRING,
    alignment: DataTypes.ENUM("left", "right", "center", "justify"),
    status: DataTypes.STRING,
  }, { hooks: {
    beforeCreate: (banner) => {
      banner.status = "Active"
    }
  },
    sequelize,
    modelName: 'Banner',
  });
  return Banner;
};