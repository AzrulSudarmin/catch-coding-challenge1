const DataTransform = require("node-json-transform").DataTransform;
 
const { dateTimeForHumans } = require('../lib/DateHandler');

const map = {
  list : 'orders',
  item: {
    orderId: "order_id",
    orderDateTime: "order_datetime",
    orderDateTimeForHumans: "order_datetime",
    totalOrderValue: "total_order_value",
    averageUnitPrice: "average_unit_price",
    distinctUnitCount: "distinct_unit_count",
    totalUnitsCount: "total_units_count",
    customerState: "customer_state",
    createdAt: "created_at",
    createdAtForHumans: "created_at",
    updatedAt: "updated_at"
  },
  operate: [
      {
        run: date => dateTimeForHumans(date) ,  
        on: "orderDateTimeForHumans"
      } ,
      {
        run: date => dateTimeForHumans(date) ,  
        on: "createdAtForHumans"
      }
  ] ,
}

module.exports = data => {  
  return DataTransform({orders: data}, map).transform();
}

