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
      await pgm.db.query(`CREATE DATABASE ${process.env.PG_DATABASE_NAME}`);
      console.log(`Database ${process.env.PG_DATABASE_NAME} created successfully.`);
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
exports.down = (pgm) => {
  pgm.dropTable('employees');
};