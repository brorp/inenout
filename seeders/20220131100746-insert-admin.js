'use strict';
const { getSalt } = require("../helpers/bcrypt");
module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = [{
      email: "superadmin@gmail.com",
      password: getSalt("asdasd"),
      fullName: 'Aku Admin Coy',
      role: 'Super Admin',
      status: 'Active',
      createdAt: new Date,
      updatedAt: new Date
    }]
    await queryInterface.bulkInsert('Admins', data);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Admins', null, {});
  }
};
