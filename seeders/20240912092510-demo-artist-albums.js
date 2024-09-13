'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert('ArtistAlbums', [
      { artistId: 1, albumId: 1, createdAt: new Date(), updatedAt: new Date() },
      { artistId: 2, albumId: 2, createdAt: new Date(), updatedAt: new Date() },
      { artistId: 3, albumId: 3, createdAt: new Date(), updatedAt: new Date() },
      { artistId: 4, albumId: 4, createdAt: new Date(), updatedAt: new Date() },
      { artistId: 5, albumId: 5, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('ArtistAlbums', null, {});
  }
};