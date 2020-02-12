const loki = require('lokijs');
const db = new loki('my.db');
const datafile = require('./data/characters.json');
const characterCount = datafile.length;

function databaseInitialize() {
  console.log('🏁 Creating database ...')
  const characters = db.addCollection('characters');
  loadData(characters);
}

function loadData(collection) {
  console.log(`✍️ Inserting ${characterCount} docs ...`);
  try {
    datafile.forEach(character => {
      collection.insert(character);
    });
  } catch(error) {
    console.log('❌ Insert was not successful', error)
  }
  testData(collection);
}

function testData(collection) {
  console.log('✅ Verifying with count');

  const count = collection.count();
  if (count === characterCount) {
    console.log(`✅ ${count} documents successfully inserted`);
  } else {
    console.log(`❌ Mismatch in document count (total: ${count} vs ${characterCount}. Insert probably failed`);
  }
}

databaseInitialize();

module.exports = {
  db
};