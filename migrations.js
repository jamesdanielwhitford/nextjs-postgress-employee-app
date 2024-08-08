const { sql } = require('@vercel/postgres');

async function createEmployeesTable() {
  try {
    await sql`
      CREATE TABLE IF NOT EXISTS employees (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        phone VARCHAR(20) NOT NULL
      );
    `;
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
  }
}

runMigrations();