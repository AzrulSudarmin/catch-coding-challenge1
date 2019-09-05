/**
 * @name writeCSVByLine
 * @param {Stream} csv  - csv stream files
 * @param {Object} order - order data details
 * 
 */

const orderModel = require('../model/orderModel');
const { dateTimeForDB } = require('../lib/DateHandler');

const store = ({ 
  order_id, order_datetime, total_order_value, average_unit_price, 
  distinct_unit_count, total_units_count, customer_state
 }) =>{
  const currentDateTime = dateTimeForDB();
  return orderModel
    .forge({ 
      order_id, 
      order_datetime, 
      total_order_value, 
      average_unit_price, 
      distinct_unit_count, 
      total_units_count, 
      customer_state,
      created_at: currentDateTime,
      updated_at: currentDateTime
    })
    .where({ order_id })  
    .upsert()
}

const get = () => new Promise((resolve, reject) => {
  orderModel
    .forge()
    .orderBy('order_id', 'ASC')
    .fetchAll()
    .then(orders => {
      resolve(orders.toJSON());
    })
    .catch(err => {
      console.log(err)
      reject(err);
    })
})

module.exports = {
  store ,
  get
}