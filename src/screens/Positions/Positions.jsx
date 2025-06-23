import React, { useEffect, useState } from "react";
import { fetchPositions } from "../../API/Positions";
import OrderPad from "../../components/OrderPad/OrderPad"; // Import the OrderPad component
import FAB from "../../components/FAB/FAB";
import "../Positions/Positions.css";

function PositionsScreen() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderPadData, setOrderPadData] = useState(null); // OrderPad modal state

  useEffect(() => {
    fetchPositions()
      .then((data) => {
        setPositions(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch positions.");
        setLoading(false);
      });
  }, []);

  const openOrderPad = (stock, type) => {
    setOrderPadData({ stock, type });
  };

  const closeOrderPad = () => {
    setOrderPadData(null);
  };

  if (loading) return <p>Loading positions...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="positions-container">
      <ul className="position-list">
        {positions.map((pos, index) => (
          <li key={index} className="position-item">
            <div>
            <strong>{pos.symbol}</strong> - {pos.quantity} shares @ ₹
            {pos.avgPrice}
            <br />
            LTP: ₹{pos.ltp} | PNL:{" "}
            <span style={{ color: pos.pnl >= 0 ? "green" : "red" }}>
              {pos.pnl}
            </span>
            </div>
            <div className="position-actions">
              <button className="buyButton" onClick={() => openOrderPad(pos, "buy")}>Buy</button>
              <button className="sellButton" onClick={() => openOrderPad(pos, "sell")}>Sell</button>
            </div>
          </li>
        ))}
      </ul>
      <FAB stockList={positions} onAction={openOrderPad} />
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

export default PositionsScreen;
