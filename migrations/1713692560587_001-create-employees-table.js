/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
  pgm.createTable('employees', {
    id: 'id',
    name: { type: 'varchar(255)', notNull: true },
    email: { type: 'varchar(255)', notNull: true },
    phone: { type: 'varchar(20)', notNull: true },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = pgm => {
  pgm.dropTable('employees');
};