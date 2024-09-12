'use strict';
module.exports = (sequelize, DataTypes) => {
  const Album = sequelize.define('Album', {
    
    title: {
      type: DataTypes.STRING,
      allowNull: false
    },
    release_year: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  
  Album.associate = function(models) {
    Album.belongsToMany(models.Genre, { through: 'AlbumGenre', foreignKey: 'albumId' });
    Album.belongsToMany(models.Artist, { through: 'ArtistAlbum', foreignKey: 'albumId' });
  };
  
  return Album;
};