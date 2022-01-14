'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      name: "ENtree",
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENtertainment",
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENsport",
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENpeople",
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    await queryInterface.bulkInsert("Categories", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
