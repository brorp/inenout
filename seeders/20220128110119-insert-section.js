'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    for(let i = 1; i <= 60; i++){
      let obj = {
        sectionTitle: 'Shading with Blend Tool',
        sectionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
        sectionImg: 'https://ik.imagekit.io/fjaskqdnu0xp/image_38_9QC-83KLm.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643254595526',
        articleId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    }
    for(let i = 1; i <= 60; i++){
      let obj = {
        sectionTitle: 'Section two of the article',
        sectionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
        sectionImg: 'https://ik.imagekit.io/fjaskqdnu0xp/1658282918_BHn8XJuw1.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643608695708',
        articleId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    }
    for(let i = 1; i <= 60; i++){
      let obj = {
        sectionTitle: 'Section two of the article',
        sectionText: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. orem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore',
        sectionImg: 'https://ik.imagekit.io/fjaskqdnu0xp/photo-1519389950473-47ba0277781c_Lr_gVKPCy.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643608702318',
        articleId: i,
        createdAt: new Date(),
        updatedAt: new Date()
      }
      data.push(obj)
    }
    await queryInterface.bulkInsert('ArticleSections', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('ArticleSections', null, {});
  }
};
