'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      imgBanner: "https://ik.imagekit.io/fjaskqdnu0xp/images__349__NLHmNGQdK.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643254350585",
      articleId: 1,
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      imgBanner: "https://ik.imagekit.io/fjaskqdnu0xp/images__349__NLHmNGQdK.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643254350585",
      articleId: 2,
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      imgBanner: "https://ik.imagekit.io/fjaskqdnu0xp/images__349__NLHmNGQdK.jpeg?ik-sdk-version=javascript-1.4.3&updatedAt=1643254350585",
      articleId: 3,
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    await queryInterface.bulkInsert("Banners", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Banners', null, {});
  }
};
