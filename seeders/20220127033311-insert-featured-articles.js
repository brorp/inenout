'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      title: "Socialising Spotify in App Experience: A Product Case Study",
      caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
      img: "https://ik.imagekit.io/fjaskqdnu0xp/images__349__NLHmNGQdK.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643254350585",
      articleId: 1,
      isHomepage: true,
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    for(let i = 2; i <= 22; i++){
      data.push({
        title: "Socialising Spotify in App Experience: A Product Case Study",
        caption: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.',
        img: "https://ik.imagekit.io/fjaskqdnu0xp/images__349__NLHmNGQdK.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643254350585",
        articleId: i,
        isHomepage: null,
        status: 'Active',
        updatedAt: new Date (),
        createdAt: new Date ()
      })
    }
    await queryInterface.bulkInsert("FeaturedArticles", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('FeaturedArticles', null, {});
  }
};
