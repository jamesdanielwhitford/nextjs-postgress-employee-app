const { sql } = require('@vercel/postgres');
const { Kysely, PostgresDialect } = require('kysely');

const db = new Kysely({
  dialect: new PostgresDialect({
    pool: {
      connectionString: process.env.POSTGRES_URL,
    },
  }),
});

async function createEmployeesTable() {
  try {
    await db.schema
      .createTable('employees')
      .addColumn('id', 'serial', (col) => col.primaryKey())
      .addColumn('name', 'varchar(255)', (col) => col.notNull())
      .addColumn('email', 'varchar(255)', (col) => col.notNull())
      .addColumn('phone', 'varchar(20)', (col) => col.notNull())
      .execute();

    console.log('Employees table created successfully.');
  } catch (error) {
    console.error('Error creating employees table:', error);
    throw error;
  }
}

async function runMigrations() {
  try {
    await createEmployeesTable();
    console.log('All migrations completed successfully.');
  } catch (error) {
    console.error('Error running migrations:', error);
  } finally {
    await db.destroy();
  }
}

runMigrations();