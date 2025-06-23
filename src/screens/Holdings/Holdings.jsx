import { useEffect, useState } from "react";
import OrderPad from "../../components/OrderPad/OrderPad";
import FAB from "../../components/FAB/FAB";
import { fetchHoldings } from "../../API/Holdings";
import "../Holdings/Holdings.css";

function Holdings() {
  const [holdings, setHoldings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderPadData, setOrderPadData] = useState(null);

  useEffect(() => {
    fetchHoldings()
      .then((data) => {
        setHoldings(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message || "Failed to fetch holdings.");
        setLoading(false);
      });
  }, []);

  const openOrderPad = (stock, type) => {
    setOrderPadData({ stock, type });
  };

  const closeOrderPad = () => {
    setOrderPadData(null);
  };

  if (loading) return <p>Loading holdings...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  // 👉 Calculate summary stats
  const totalInvestment = holdings.reduce(
    (sum, stock) => sum + stock.avgPrice * stock.quantity,
    0
  );
  const currentValue = holdings.reduce(
    (sum, stock) => sum + stock.ltp * stock.quantity,
    0
  );
  const totalPNL = currentValue - totalInvestment;

  // Simulating day's PNL (LTP - yesterdayPrice), assume yesterdayPrice = avgPrice ± some value
  const daysPNL = holdings.reduce((sum, stock) => {
    const yesterdayPrice = stock.avgPrice * 1.01; // Example assumption
    return sum + (stock.ltp - yesterdayPrice) * stock.quantity;
  }, 0);

  return (
    <div className="holdings-container">
      {/* 🔼 Summary Info Section */}
      <div className="holdings-summary">
        <p>Total Investment : ₹{totalInvestment.toFixed(2)}</p>
        <p>Current Value : ₹{currentValue.toFixed(2)}</p>
        <p>Total P&L : <span className={totalPNL >= 0 ? "pnl-positive" : "pnl-negative"}>₹{totalPNL.toFixed(2)}</span></p>
        <p>Day's P&L : <span className={daysPNL >= 0 ? "pnl-positive" : "pnl-negative"}>₹{daysPNL.toFixed(2)}</span></p>
      </div>

      <ul className="holding-list">
        {holdings.map((stock, index) => {
          const pnl = (stock.ltp - stock.avgPrice) * stock.quantity;
          return (
            <li className="holding-item" key={index}>
              <div className="holding-symbol">{stock.symbol}
              <div className="holding-info">
                Qty: {stock.quantity} | Avg: ₹{stock.avgPrice} | LTP: ₹{stock.ltp} | PNL:{" "}
                <span className={pnl >= 0 ? "pnl-positive" : "pnl-negative"}>
                  ₹{pnl.toFixed(2)}
                </span></div>
              </div>
              <div className="holding-actions">
                <button className="buyButton"onClick={() => openOrderPad(stock, "buy")}>Buy</button>
                <button className="sellButton"onClick={() => openOrderPad(stock, "sell")}>Sell</button>
              </div>
            </li>
          );
        })}
      </ul>

      <FAB stockList={holdings} onAction={openOrderPad} />

      {orderPadData && (
        <OrderPad
          stock={orderPadData.stock}
          type={orderPadData.type}
          onClose={closeOrderPad}
        />
      )}
    </div>
  );
}

export default Holdings;
