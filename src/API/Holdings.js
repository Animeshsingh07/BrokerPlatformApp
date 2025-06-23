const holdings = [
  { symbol: "INFY", quantity: 10, avgPrice: 1500, ltp: 1600 },
  { symbol: "TCS", quantity: 5, avgPrice: 3200, ltp: 3100 },
  { symbol: "RELIANCE", quantity: 8, avgPrice: 2400, ltp: 2500 },
  { symbol: "INFY", quantity: 10, avgPrice: 1500, ltp: 1600 },
  { symbol: "TCS", quantity: 5, avgPrice: 3200, ltp: 3100 },
  { symbol: "RELIANCE", quantity: 8, avgPrice: 2400, ltp: 2500 },
  { symbol: "INFY", quantity: 10, avgPrice: 1500, ltp: 1600 },
  { symbol: "TCS", quantity: 5, avgPrice: 3200, ltp: 3100 },
  { symbol: "RELIANCE", quantity: 8, avgPrice: 2400, ltp: 2500 },
];

export function fetchHoldings() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(holdings);
    }, 800);
  });
}