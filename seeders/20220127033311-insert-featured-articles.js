'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      img: "https://ik.imagekit.io/fjaskqdnu0xp/images__349__NLHmNGQdK.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643254350585",
      articleId: 1,
      isHomepage: true,
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      img: "https://ik.imagekit.io/fjaskqdnu0xp/images__349__NLHmNGQdK.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643254350585",
      articleId: 2,
      isHomepage: null,
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      img: "https://ik.imagekit.io/fjaskqdnu0xp/images__349__NLHmNGQdK.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643254350585",
      articleId: 3,
      isHomepage: null,
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    await queryInterface.bulkInsert("FeaturedArticles", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FeaturedArticles', null, {});
  }
};
