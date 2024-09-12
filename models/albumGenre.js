'use strict';
module.exports = (sequelize, DataTypes) => {
  const AlbumGenre = sequelize.define('AlbumGenre', {
    albumId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Album',
        key: 'id'
      }
    },
    genreId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Genre',
        key: 'id'
      }
    }
  }, {});
  
  return AlbumGenre;
};
