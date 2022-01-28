'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    for(let i = 1; i < 60; i++){
      let obj = {
        commentId: i,
        userId: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    }
    await queryInterface.bulkInsert('CommentLikes', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('CommentLikes', null, {});
  }
};
