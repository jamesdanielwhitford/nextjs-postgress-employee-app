const { Pool } = require('@vercel/postgres');

let pool;

async function getPool() {
  if (!pool) {
    pool = new Pool({
      connectionString: process.env.POSTGRES_URL,
      ssl: {
        rejectUnauthorized: false
      }
    });
    
    // Test the connection
    try {
      const client = await pool.connect();
      console.log('Connected to database successfully');
      client.release();
    } catch (err) {
      console.error('Error connecting to database:', err);
      throw err;
    }
  }
  return pool;
}

module.exports = {
  query: async (text, params) => {
    const pool = await getPool();
    return pool.query(text, params);
  },
};