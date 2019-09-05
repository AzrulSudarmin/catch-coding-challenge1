/**
 * @name writeCSVByLine
 * @param {Stream} csv  - csv stream files
 * @param {Object} order - order data details
 * 
 */

const orderModel = require('../model/orderModel');

const store = ({ 
  order_id, order_datetime, total_order_value, average_unit_price, 
  distinct_unit_count, total_units_count, customer_state
 }) => new Promise((resolve, reject) => {
  orderModel
    .forge({ 
      order_id, 
      order_datetime, 
      total_order_value, 
      average_unit_price, 
      distinct_unit_count, 
      total_units_count, 
      customer_state
    })
    .where({ order_id })  
    .upsert() 
})

const fetch = () => new Promise((resolve, reject) => {
  orderModel
    .fetchAll()
    .then(orders => {
      resolve(orders.toJSON());
    })
    .catch(err => {
      // console.log(err)
      reject(err);
    })
})

module.exports = {
  store
}