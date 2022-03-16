'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      name: "ENterview",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENtree",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENtainment",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENsport",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENpeople",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENtizen",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENlightment",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    await queryInterface.bulkInsert("Categories", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Categories', null, {});
  }
};
