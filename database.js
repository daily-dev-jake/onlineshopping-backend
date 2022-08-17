const sqlite3 = require('sqlite3').verbose();

var connection = new sqlite3.Database('./shoppingdb.db', (err) => {
    if (err) {
      console.error(err.message);
    }
    console.log('Connected to the shopping database.');
  });
  
  module.exports = { connection };
  