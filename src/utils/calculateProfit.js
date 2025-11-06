export const calculateProfit = (order) => {
  if (order && order.orderItem?.buyPrice && order.orderItem?.sellPrice) {
    const profit = Number(order.orderItem.sellPrice) - Number(order.orderItem.buyPrice);
    return isNaN(profit) ? 0 : profit;
  }
  return 0; // always return a number, never a string
};
