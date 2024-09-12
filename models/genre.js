'use strict';
module.exports = (sequelize, DataTypes) => {
  const Genre = sequelize.define('Genre', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {});
  
  Genre.associate = function(models) {
    Genre.belongsToMany(models.Album, { through: 'AlbumGenre', foreignKey: 'genreId' });
  };
  
  return Genre;
};
