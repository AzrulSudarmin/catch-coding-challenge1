const getTotalOrder = orders => orders.reduce((acc, curr) => acc + (curr.unit_price*curr.quantity), 0);
const getTotalUnits = orders => orders.reduce((acc,curr) => acc + curr.quantity, 0);

const getDiscount = ({discounts, total}) => 
  discounts.reduce((acc, discount) => acc + (
    discount.type === 'DOLLAR' 
      ? discount.value 
      : (total/100)*discount.value
  ));

module.exports = {
  getDiscount ,
  getTotalOrder ,
  getTotalUnits
}