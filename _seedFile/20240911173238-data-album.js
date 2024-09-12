module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      "Artists",
      [
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
        { id: 3, name: "Adele", createdAt: new Date(), updatedAt: new Date() },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "Genres",
      [
        { id: 1, name: "Pop", createdAt: new Date(), updatedAt: new Date() },
        {
          id: 2,
          name: "Acoustic",
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        { id: 3, name: "Soul", createdAt: new Date(), updatedAt: new Date() },
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert(
      "Albums",
      [
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
      ],
      { returning: true }
    );

    await queryInterface.bulkInsert("ArtistAlbums", [
      { artistId: 1, albumId: 1, createdAt: new Date(), updatedAt: new Date() },
      { artistId: 2, albumId: 2, createdAt: new Date(), updatedAt: new Date() },
      { artistId: 3, albumId: 3, createdAt: new Date(), updatedAt: new Date() },
    ]);

    await queryInterface.bulkInsert("AlbumGenres", [
      { albumId: 1, genreId: 1, createdAt: new Date(), updatedAt: new Date() },
      { albumId: 2, genreId: 2, createdAt: new Date(), updatedAt: new Date() },
      { albumId: 3, genreId: 3, createdAt: new Date(), updatedAt: new Date() },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("ArtistAlbums", null, {});
    await queryInterface.bulkDelete("AlbumGenres", null, {});
    await queryInterface.bulkDelete("Artists", null, {});
    await queryInterface.bulkDelete("Albums", null, {});
    await queryInterface.bulkDelete("Genres", null, {});
  },
};
