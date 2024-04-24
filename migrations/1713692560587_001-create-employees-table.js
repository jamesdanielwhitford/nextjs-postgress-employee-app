require('dotenv').config(); // at the top of your main file
/**
 * @type {import('node-pg-migrate').ColumnDefinitions | undefined}
 */
exports.shorthands = undefined;

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.up = async (pgm) => {
  try {
    // Check if the database exists
    const databaseExists = await pgm.db.query("SELECT 1 FROM pg_database WHERE datname = current_database()");

    if (!databaseExists.rows.length) {
      // Create the database if it doesn't exist
      const databaseName = process.env.DATABASE_NAME
      await pgm.db.query(`CREATE DATABASE ${databaseName}`);
      console.log(`Database ${databaseName} created successfully.`);
    }

    // Create the employees table
    pgm.createTable('employees', {
      id: 'id',
      name: { type: 'varchar(255)', notNull: true },
      email: { type: 'varchar(255)', notNull: true },
      phone: { type: 'varchar(20)', notNull: true },
    });
  } catch (error) {
    console.error('Error creating database or table:', error);
  }
};

/**
 * @param pgm {import('node-pg-migrate').MigrationBuilder}
 * @param run {() => void | undefined}
 * @returns {Promise<void> | void}
 */
exports.down = async (pgm) => {
  try {
    // Create a default empty database
    await pgm.db.query('CREATE DATABASE defaultdb');
    console.log('Default empty database created successfully.');

    // Get the database name from the DATABASE_URL
    const databaseName = process.env.DATABASE_NAME

    // Switch to the database to be dropped
    await pgm.db.query(`USE ${databaseName}`);

    // Drop the employees table
    pgm.dropTable('employees');

    // Drop the database
    await pgm.db.query(`DROP DATABASE ${databaseName}`);
    console.log(`Database ${databaseName} dropped successfully.`);
  } catch (error) {
    console.error('Error dropping database or creating default database:', error);
  }
};