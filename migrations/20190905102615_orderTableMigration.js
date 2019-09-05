
exports.up = function(knex) {
  return knex.schema.createTable('orders', function(t) {
    t.increments('order_id').unsigned().primary();
    t.dateTime('order_datetime').notNull();
    t.decimal('total_order_value', 20, 2).notNull();
    t.decimal('average_unit_price', 20, 2).notNull();
    t.integer('distinct_unit_count').notNull();
    t.integer('total_units_count').notNull();
    t.string('customer_state').notNull();
    t.dateTime('created_at').nullable();
    t.dateTime('updated_at').nullable();
    t.dateTime('deleted_at').nullable();
  });
};

exports.down = function(knex) {
  return knex.schema.dropTable('orders');
};
