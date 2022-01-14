'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      name: "Fashion",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Beauty",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Relationship",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Career & Money",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Hot Spot",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Travel",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Gadget",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Art",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "What's Happening",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Music",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Movie",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Book",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Games",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Health",
      categoryId: 3,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Sport",
      categoryId: 3,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Hobby",
      categoryId: 4,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Zodiak",
      categoryId: 4,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Mental Health",
      categoryId: 4,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Personality",
      categoryId: 4,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Parenting",
      categoryId: 4,
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    await queryInterface.bulkInsert("SubCategories", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SubCategories', null, {});
  }
};
