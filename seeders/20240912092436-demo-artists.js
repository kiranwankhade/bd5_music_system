'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Artists', [
      {
        id: 1,
        name: "Taylor Swift",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: 2,
        name: "Ed Sheeran",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      { 
        id: 3, 
        name: "Adele", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 4, 
        name: "The Weeknd", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
      { 
        id: 5, 
        name: "Harry Styles", 
        createdAt: new Date(), 
        updatedAt: new Date() 
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Artists', null, {});
  }
};