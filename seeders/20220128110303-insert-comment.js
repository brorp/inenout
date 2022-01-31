'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    for(let i = 1; i <= 60; i++){
      let obj = {
        commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
        userId: 1,
        articleId: i,
        status: 'Active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    }
    for(let i = 1; i <= 60; i++){
      let obj = {
        commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
        userId: 1,
        articleId: i,
        status: 'Active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    }
    for(let i = 1; i <= 60; i++){
      let obj = {
        commentText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
        userId: 1,
        articleId: i,
        status: 'Active',
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    }
    await queryInterface.bulkInsert('Comments', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Comments', null, {});
  }
};
