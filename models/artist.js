'use strict';
module.exports = (sequelize, DataTypes) => {
  const Artist = sequelize.define('Artist', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  Artist.associate = function(models) {
    Artist.belongsToMany(models.Album, { through: 'ArtistAlbum', foreignKey: 'artistId' });
  };
  
  return Artist;
};
