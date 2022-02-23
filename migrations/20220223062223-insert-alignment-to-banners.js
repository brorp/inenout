'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.addColumn("Banners", "alignment", {
      type: Sequelize.ENUM("left", "right", "center", "justify"),
      defaultValue: "center",
    })
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.removeColumn("Banners", "alignment")
  }
};
