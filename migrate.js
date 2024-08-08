require('dotenv').config();

console.log(process.env.POSTGRES_URL);

const migrate = require('node-pg-migrate').default;
const { Pool } = require('pg');
const databaseUrl = process.env.POSTGRES_URL + "?sslmode=require";

const pool = new Pool({ connectionString: databaseUrl });

const migrateOptions = {
  databaseUrl,
  dir: 'migrations',
  migrationsTable: 'migrations',
  count: Infinity,
  schema: 'public',
};

migrate(migrateOptions, pool)
  .then(() => console.log('Migrations completed successfully'))
  .catch((error) => console.error('Error migrating:', error))
  .finally(() => pool.end());