const orderDataBuilder = require('../builder/orderBuilder');

const lineManipulator = (selectedLine, csv) => {
  try {
    const order = JSON.parse(selectedLine);
    
    //exclue order data that doesn't have items
    if (order.items.length <= 0)  return;

    //build order data to single object
    const orderData = orderDataBuilder(order);
    
    //write order data to csv files when total order value more than zero
    if (orderData.total_order_value) {
      console.log(`write order ${order.order_id} to csv files`);
      csv.write(orderData);
    }

  } catch (error) {
    return;
  }
};

module.exports = lineManipulator;