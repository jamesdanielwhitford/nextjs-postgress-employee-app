const { Pool } = require('pg');

const pool = new Pool({
  connectionString: process.env.POSTGRES_URL + "?sslmode=require",
});

console.error('Using database:', process.env.POSTGRES_URL);

pool.query('SELECT NOW()', (err, res) => {
  if (err) {
    console.error('Error connecting to database:', err);
  } else {
    console.log('Connected to database successfully');
    console.log('Current timestamp:', res.rows[0].now);
  }
});

module.exports = pool;