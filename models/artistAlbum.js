'use strict';
module.exports = (sequelize, DataTypes) => {
  const ArtistAlbum = sequelize.define('ArtistAlbum', {
    artistId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Artist',
        key: 'id'
      }
    },
    albumId: {
      type: DataTypes.INTEGER,
      references: {
        model: 'Album',
        key: 'id'
      }
    }
  }, {});
  
  return ArtistAlbum;
};
