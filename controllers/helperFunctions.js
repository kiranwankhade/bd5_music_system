// const { Artist, Album, Genre, ArtistAlbum, AlbumGenre } = require('../models');

// async function getAlbumGenre(albumId) {
//     const albumGenres = await AlbumGenre.findAll({
//       where: { albumId },
//     });

//     let genreData;
//     for (let albumGenre of albumGenres) {
//         genreData = await Genre.findOne({
//         where: { id: albumGenre.genreId },
//       });
//     }
  
//     return genreData;
// }
  
// async function getArtistAlbum(albumId) {
//     const artistAlbums = await ArtistAlbum.findAll({
//       where: { albumId },
//     });

//     let artistData;
//     for (let albumArtist of artistAlbums) {
//         artistData = await Artist.findOne({
//         where: { id: albumArtist.artistId },
//       });
//     }
  
//     return artistData;
//   }

// const getAlbumsWithAssociations = async (albumData) => {
//     try {
//         const artist = await getArtistAlbum(albumData.id);
//         const genre = await getAlbumGenre(albumData.id);

//         albumData.artist = artist;
//         albumData.genre = genre;

//         return {
//             ...albumData.dataValues,
//             artist,
//             genre,
//         };
//     } catch (error) {
//       console.error('Error fetching albums with associations:', error);
//     }
//   };
  
//   module.exports = {
//     getAlbumsWithAssociations,
//     getAlbumGenre,
//     getArtistAlbum
//   }

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
