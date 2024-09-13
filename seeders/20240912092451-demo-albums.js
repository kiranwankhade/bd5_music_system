
'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Albums',  [
      {
        id: 1,
        title: "1989",
        release_year: 2014,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        title: "Divide",
        release_year: 2017,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 3,
        title: "25",
        release_year: 2015,
        createdAt: new Date(),
        updatedAt: new Date(),
      }, 
      {
        id: 4,
        title: "After Hours",
        release_year: 2020,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 5,
        title: "Fine Line",
        release_year: 2019,
        createdAt: new Date(),
        updatedAt: new Date(),
      }
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Albums', null, {});
  }
};
