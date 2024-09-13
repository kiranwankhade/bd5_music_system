"use strict";

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert("Genres", [
      { id: 1, name: "Pop", createdAt: new Date(), updatedAt: new Date() },
      { id: 2,name: "Acoustic",createdAt: new Date(),updatedAt: new Date()},
      { id: 3, name: "Soul", createdAt: new Date(), updatedAt: new Date() },
      { id: 4, name: "R&B", createdAt: new Date(), updatedAt: new Date() },
      { id: 5, name: "Rock", createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete("Genres", null, {});
  },
};
