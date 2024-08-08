require('dotenv').config();

const migrate = require('node-pg-migrate').default;
const { Pool } = require('pg');

const databaseUrl = process.env.POSTGRES_URL + "?sslmode=require";

const pool = new Pool({ connectionString: databaseUrl });

const migrateOptions = {
  dbClient: pool,
  migrationsTable: 'pgmigrations',
  dir: 'migrations',
  direction: 'up',
  count: Infinity,
};

migrate(migrateOptions)
  .then(() => {
    console.log('Migrations completed successfully');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Error migrating:', error);
    process.exit(1);
  });