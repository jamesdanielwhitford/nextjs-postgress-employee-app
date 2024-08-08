// config/database.js
const { Pool } = require('@vercel/postgres');

let pool;

if (!pool) {
  pool = new Pool({
    connectionString: process.env.POSTGRES_URL,
    ssl: {
      rejectUnauthorized: false
    }
  });
}

async function connectToDatabase() {
  try {
    const client = await pool.connect();
    const result = await client.query('SELECT NOW()');
    console.log('Connected to database successfully');
    console.log('Current timestamp:', result.rows[0].now);
    client.release();
  } catch (err) {
    console.error('Error connecting to database:', err);
  }
}

connectToDatabase();

module.exports = {
  query: (text, params) => pool.query(text, params),
};