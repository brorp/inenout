'use strict';

const { getSalt } = require("../helpers/bcrypt");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [{
      username: "spiderman88",
      email: "inenout.dummy@gmail.com",
      password: getSalt("asdasd"),
      fullName: 'Peter Parker',
      phoneNumber: '082190139112',
      profilePic: 'https://ik.imagekit.io/fjaskqdnu0xp/Ellipse_7_r2ng7EgQ1ru.png?ik-sdk-version=javascript-1.4.3&updatedAt=1642502319980',
      status: 'Active',
      verifiedAt: '2022-01-01',
      updatedAt: new Date (),
      createdAt: new Date ()
    }]
    await queryInterface.bulkInsert("Users", data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
