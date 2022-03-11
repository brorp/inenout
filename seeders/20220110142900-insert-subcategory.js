'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      name: "ENterview",
      categoryId: 1,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Fashion",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Beauty",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Relationship",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Career & Money",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Hot Spot",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Travel",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Gadget",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Art",
      categoryId: 2,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "What's Happening",
      categoryId: 3,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Music",
      categoryId: 3,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Movie",
      categoryId: 3,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Book",
      categoryId: 3,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Games",
      categoryId: 3,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Health",
      categoryId: 4,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Sport",
      categoryId: 4,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Hobby",
      categoryId: 5,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Zodiak",
      categoryId: 5,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Mental Health",
      categoryId: 5,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Personality",
      categoryId: 5,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "Parenting",
      categoryId: 5,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENtizen",
      categoryId: 6,
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      name: "ENlightment",
      categoryId: 7,
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    await queryInterface.bulkInsert("SubCategories", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('SubCategories', null, {});
  }
};
