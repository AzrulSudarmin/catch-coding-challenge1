const DataTransform = require("node-json-transform").DataTransform;
// const { dateTimeForDB } = require('../lib/DateHandler');

const map = {
  list : 'orders',
  item: {
    orderId: "order_id",
    orderDateTime: "order_datetime",
    totalOrderValue: "total_order_value",
    averageUnitPrice: "average_unit_price",
    distinctUnitCount: "distinct_unit_count",
    totalUnitsCount: "total_units_count",
    customerState: "customer_state",
    createdAt: "created_at",
    updatedAt: "updated_at"
  },
  
  // operate: [
  //     {
  //       run: date => moment(date).tz('Asia/Jakarta').locale('id-ID').format('D MMMM YYYY') ,  
  //       on: "createdAtForHumans"
  //     }
  // ] ,
}

module.exports = data => {  
  return DataTransform({orders: data}, map).transform();
}

