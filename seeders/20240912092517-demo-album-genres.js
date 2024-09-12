'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('AlbumGenres', [
      { albumId: 1, genreId: 1, createdAt: new Date(), updatedAt: new Date() },
      { albumId: 2, genreId: 2, createdAt: new Date(), updatedAt: new Date() },
      { albumId: 3, genreId: 3, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('AlbumGenres', null, {});
  }
};
