'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      title: "ADS 1",
      url: 'https://www.w3.org/Out-Of-Date/hypertext/TBL_Disclaimer.html',
      imgAds: "https://ik.imagekit.io/fjaskqdnu0xp/A_D_S_YRz-DR9Og.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643363007631",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      title: "ADS 2",
      url: 'https://www.w3.org/Out-Of-Date/hypertext/TBL_Disclaimer.html',
      imgAds: "https://ik.imagekit.io/fjaskqdnu0xp/A_D_S_YRz-DR9Og.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643363007631",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      title: "ADS 3",
      url: 'https://www.w3.org/Out-Of-Date/hypertext/TBL_Disclaimer.html',
      imgAds: "https://ik.imagekit.io/fjaskqdnu0xp/A_D_S_YRz-DR9Og.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643363007631",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    },{
      title: "ADS 4",
      url: 'https://www.w3.org/Out-Of-Date/hypertext/TBL_Disclaimer.html',
      imgAds: "https://ik.imagekit.io/fjaskqdnu0xp/A_D_S_YRz-DR9Og.png?ik-sdk-version=javascript-1.4.3&updatedAt=1643363007631",
      status: 'Active',
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    await queryInterface.bulkInsert("Ads", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Ads', null, {});
  }
};
