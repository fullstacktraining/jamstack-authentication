const db = require('./setup').db;
const charactersCollection = db.getCollection('characters');

const characters = (req, res) => {
  const characters = charactersCollection.find({});
  return res.json(characters).status(200);
};

const character = (req, res) => {
  let { id } = req.params;
  id = parseInt(id);
  const character = charactersCollection.find({
    $loki: id
  });
  return res.json(character).status(200);
};

const favourites = (req, res) => {
  const favourites = charactersCollection.find({
    alliance: 'Galactic Empire'
  });
  return res.json(favourites).status(200);
}

module.exports = {
  characters,
  character,
  favourites
};