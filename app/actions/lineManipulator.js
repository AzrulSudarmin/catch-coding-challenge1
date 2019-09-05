/**
 * @name lineManipulator
 * @summary
 * Function to write stream file
 * @param {String} selectedLine - string from json format
 */

const orderDataBuilder = require('../builder/orderBuilder');
const orderService = require('../service/orderService');

const lineManipulator = selectedLine => new Promise((resolve, reject) => {
  try {
    const order = JSON.parse(selectedLine);
    
    //exclue order data that doesn't have items
    if (order.items.length <= 0)  return;

    //build order data to single object
    const orderData = orderDataBuilder(order);
    
    //write order data to csv files when total order value more than zero    
    if (orderData.total_order_value) {
      orderService.store(orderData)
        .then(() => {
          resolve(orderData)
        })
        .catch(err => {
          // console.log(err);
          reject(err)
        });
    } else {
      resolve(null)
    }

  } catch (error) {
    reject(error)
  }
});

module.exports = lineManipulator;