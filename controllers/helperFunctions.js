const { Artist, Album, Genre, ArtistAlbum, AlbumGenre } = require('../models');

async function getAlbumGenres(albumId) {
    const albumGenres = await AlbumGenre.findAll({
      where: { albumId },
    });

    const genres = [];
    for (let albumGenre of albumGenres) {
        const genre = await Genre.findOne({
          where: { id: albumGenre.genreId },
        });
        if (genre) genres.push(genre);
    }
  
    return genres;
}

async function getArtistAlbums(albumId) {
    const artistAlbums = await ArtistAlbum.findAll({
      where: { albumId },
    });

    const artists = [];
    for (let artistAlbum of artistAlbums) {
        const artist = await Artist.findOne({
          where: { id: artistAlbum.artistId },
        });
        if (artist) artists.push(artist);
    }
  
    return artists;
}

const getAlbumsWithAssociations = async (albumData) => {
    try {
        const artists = await getArtistAlbums(albumData.id);
        const genres = await getAlbumGenres(albumData.id);

        return {
            ...albumData.dataValues,
            artist: artists.length > 0 ? artists[0] : null,
            genre: genres.length > 0 ? genres[0] : null,
        };
    } catch (error) {
        console.error('Error fetching albums with associations:', error);
    }
};

module.exports = {
    getAlbumsWithAssociations,
    getAlbumGenres,
    getArtistAlbums
};
