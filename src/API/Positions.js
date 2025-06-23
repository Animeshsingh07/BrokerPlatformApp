const positions = [
  { symbol: "BAJAJFINSV", quantity: 2, avgPrice: 14000, ltp: 14500, pnl: 1000 },
  { symbol: "HDFC", quantity: 10, avgPrice: 2500, ltp: 2480, pnl: -200 },
  { symbol: "ITC", quantity: 20, avgPrice: 400, ltp: 410, pnl: 200 },
  { symbol: "BAJAJFINSV", quantity: 2, avgPrice: 14000, ltp: 14500, pnl: 1000 },
  { symbol: "HDFC", quantity: 10, avgPrice: 2500, ltp: 2480, pnl: -200 },
  { symbol: "ITC", quantity: 20, avgPrice: 400, ltp: 410, pnl: 200 },
  { symbol: "BAJAJFINSV", quantity: 2, avgPrice: 14000, ltp: 14500, pnl: 1000 },
  { symbol: "HDFC", quantity: 10, avgPrice: 2500, ltp: 2480, pnl: -200 },
  { symbol: "ITC", quantity: 20, avgPrice: 400, ltp: 410, pnl: 200 }
];

export function fetchPositions() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(positions);
    }, 800);
  });
}