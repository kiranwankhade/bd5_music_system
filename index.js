
const express = require("express");
const sequelize = require("./lib/sequelize");
const { Artist, Album, Genre, ArtistAlbum, AlbumGenre } = require("./models");
const {
  getAlbumsWithAssociations,
} = require("./controllers/helperFunctions");

const app = express();
app.use(express.json());

// Sync the database
sequelize
  .sync()
  .then(() => {
    console.log("Database connected and synchronized.");
  })
  .catch((err) => {
    console.error("Unable to connect to the database:", err);
  });

// Test DB connection
app.get("/test-connection", async (req, res) => {
  try {
    await sequelize.authenticate();
    res.send("Database connection successful");
  } catch (error) {
    res.status(500).send("Database connection failed");
  }
});

// Define endpoints
app.get("/album/sort-by-release-year", async (req, res) => {
  const order = req.query.order || "ASC";
  const albums = await Album.findAll({ order: [["release_year", order]] });

  const albumDetails = [];
  for (let albumData of albums) {
    const detailedAlbum = await getAlbumsWithAssociations(albumData);
    albumDetails.push(detailedAlbum);
  }

  return res.json({ albums: albumDetails });
});

app.get("/album/artist/:artistId", async (req, res) => {
  const artistAlbum = await ArtistAlbum.findAll({
    where: { artistId: req.params.artistId },
  });

  const albumsWithDetails = [];
  for (let artAlm of artistAlbum) {
    const albumData = await Album.findByPk(artAlm.albumId);
    const detailedAlbums = await getAlbumsWithAssociations(albumData);
    albumsWithDetails.push(detailedAlbums);
  }

  return res.json({ albums: albumsWithDetails });
});

app.get("/album/genre/:genreId", async (req, res) => {
  const albumGenres = await AlbumGenre.findAll({
    where: { genreId: req.params.genreId },
  });

  const albumsWithDetails = [];
  for (let albmGen of albumGenres) {
    const albumData = await Album.findByPk(albmGen.albumId);
    const detailedAlbums = await getAlbumsWithAssociations(albumData);
    albumsWithDetails.push(detailedAlbums);
  }

  return res.json({ albums: albumsWithDetails });
});

app.get("/albums", async (req, res) => {
  const albums = await Album.findAll();

  const albumsWithDetails = [];
  for (let albumData of albums) {
    const detailedAlbums = await getAlbumsWithAssociations(albumData);
    albumsWithDetails.push(detailedAlbums);
  }

  return res.json({ albums: albumsWithDetails });
});

app.get("/albums/details/:id", async (req, res) => {
  const albumData = await Album.findByPk(req.params.id);
  if (!albumData) {
    return res.status(404).send({ message: "albumData not found" });
  }

  const detailedAlbums = await getAlbumsWithAssociations(albumData);
  return res.json({ album: detailedAlbums });
});

app.post("/albums/new", async (req, res) => {
  try {
    const { title, release_year, artistId, genreId } = req.body;

    // Create the new album
    const albumData = await Album.create({ title, release_year });
    console.log('albumData:', albumData)

    // Create associations if provided
    if (artistId) {
      await ArtistAlbum.create({
        albumId: albumData.id,
        artistId,
      });
    }

    if (genreId) {
      await AlbumGenre.create({
        albumId: albumData.id,
        genreId,
      });
    }

    // Fetch detailed album information
    const detailAlbum = await getAlbumsWithAssociations(albumData);

    // Send the response
    return res.json({
      message: "Album added successfully",
      album: detailAlbum,
    });
  } catch (error) {
    console.error("Error creating album:", error);
    res.status(500).json({ error: "Failed to create album" });
  }
});

app.post("/albums/update/:id", async (req, res) => {
  try {
    const { title, release_year, artistId, genreId } = req.body;

    const albumData = await Album.findByPk(req.params.id);

    if (!albumData) {
      return res.status(404).send({ message: "Album not found" });
    }

    if (title) albumData.title = title;
    if (release_year) albumData.release_year = release_year;

    await albumData.save();

    if (artistId) {
      await ArtistAlbum.destroy({
        where: {
          albumId: parseInt(albumData.id),
        },
      });
      await ArtistAlbum.create({
        albumId: albumData.id,
        artistId,
      });
    }

    if (genreId) {
      await AlbumGenre.destroy({
        where: { albumId: albumData.id },
      });
      await AlbumGenre.create({ albumId: albumData.id, genreId });
    }

    const detailedAlbum = await getAlbumsWithAssociations(albumData);
    return res.json({
      message: "Album Update successfully",
      album: detailedAlbum,
    });
  } catch (error) {
    console.error("Error updating album:", error);
    res.status(500).json({ error: "Failed to Update album" });
  }
});

app.post("/albums/delete", async (req, res) => {
  try {
    const albumData = await Album.findByPk(req.body.id);
    if (!albumData) {
      return res.status(404).json({ message: "Album not found" });
    } else {
      await ArtistAlbum.destroy({
        where: { albumId: parseInt(req.body.id) },
      });
      await AlbumGenre.destroy({
        where: { albumId: parseInt(req.body.id) },
      });
      await albumData.destroy();

      return res.json({
        message: `Album with ID ${req.body.id} has been deleted.`,
      });
    }
  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
});


// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});