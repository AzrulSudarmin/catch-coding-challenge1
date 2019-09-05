/**
 * @name orderBuilder
 * 
 * @summary
 * organize data by calculating the price and number of items
 * 
 * @param {Number} order_id  - id from the order
 * @param {Date} order_date - order date with date type
 * @param {Array} items  - list of items order
 * @param {Array} discounts - list of discounts
 * @param {Object} customer  - customer object with detail information such as shipping address or name
 */

const { getDiscount, getTotalOrder, getTotalUnits } = require('../helper/orderHelper');

const orderBuilder = ({ order_id, order_date, items, discounts, customer }) => {

  const totalOrder = getTotalOrder(items);
  const totalUnits = getTotalUnits(items);
  const totalDiscount = getDiscount({discounts, totalOrder});

  //exclude record with 0 order value
  return totalOrder > 0 ? {
    order_id,
    order_datetime: order_date,
    total_order_value: totalOrder - totalDiscount,
    average_unit_price: totalOrder / totalUnits,
    distinct_unit_count: items.length,
    total_units_count: totalUnits,
    customer_state: customer.shipping_address.state
  } : {};
}

module.exports = orderBuilder;