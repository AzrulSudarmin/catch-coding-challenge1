/**
 * @name writeCSVByLine
 * @param {Stream} csv  - csv stream files
 * @param {Object} order - order data details
 */

const { getDiscount, getTotalOrder, getTotalUnits } = require('../helper/orderHelper');

const csvLineWriter = ({ csv, order }) => {
  const { 
    order_id,
    order_date,
    items, 
    discounts, 
    customer
  } = order;

  const totalOrder = getTotalOrder(items);
  const totalUnits = getTotalUnits(items);
  const totalDiscount = getDiscount({discounts, totalOrder});

  csv.write({
    order_id,
    order_datetime: order_date,
    total_order_value: totalOrder - totalDiscount,
    average_unit_price: totalOrder / totalUnits,
    distinct_unit_count: items.length,
    total_units_count: totalUnits,
    customer_state: customer.shipping_address.state
  })
}

module.exports = csvLineWriter;