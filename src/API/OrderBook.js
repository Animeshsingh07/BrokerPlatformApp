const orderbook = [
  { symbol: "INFY", type: "BUY", price: 1500, quantity: 10, status: "Completed", pnl: "+100", realized: true },
  { symbol: "TCS", type: "SELL", price: 3300, quantity: 5, status: "Completed", pnl: "-50", realized: false },
  { symbol: "WIPRO", type: "BUY", price: 420, quantity: 20, status: "Pending", pnl: "0", realized: false },
  { symbol: "INFY", type: "BUY", price: 1500, quantity: 10, status: "Completed", pnl: "+100", realized: true },
  { symbol: "TCS", type: "SELL", price: 3300, quantity: 5, status: "Completed", pnl: "-50", realized: false },
  { symbol: "WIPRO", type: "BUY", price: 420, quantity: 20, status: "Pending", pnl: "0", realized: false },
  { symbol: "INFY", type: "BUY", price: 1500, quantity: 10, status: "Completed", pnl: "+100", realized: true },
  { symbol: "TCS", type: "SELL", price: 3300, quantity: 5, status: "Completed", pnl: "-50", realized: false },
  { symbol: "WIPRO", type: "BUY", price: 420, quantity: 20, status: "Pending", pnl: "0", realized: false }
];

export function fetchOrderbook() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(orderbook);
    }, 800);
  });
}