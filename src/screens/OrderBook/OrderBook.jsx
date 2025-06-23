import React, { useEffect, useState } from "react";
import { fetchOrderbook } from "../../API/OrderBook";
import OrderPad from "../../components/OrderPad/OrderPad"; // Import OrderPad component
import FAB from "../../components/FAB/FAB";
import "../OrderBook/OrderBook.css";

function OrderbookScreen() {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [orderPadData, setOrderPadData] = useState(null); // For modal state

  useEffect(() => {
    fetchOrderbook()
      .then((data) => {
        setOrders(data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load orderbook.");
        setLoading(false);
      });
  }, []);

  const openOrderPad = (stock, type) => {
    setOrderPadData({ stock, type });
  };

  const closeOrderPad = () => {
    setOrderPadData(null);
  };

  if (loading) return <p>Loading orderbook...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div className="orderbook-container">
      <ul className="order-list">
        {orders.map((order, index) => (
          <li key={index} className={`order-item ${order.type.toLowerCase()}`}>
            <div>
              <strong>{order.symbol}</strong> - {order.type} {order.quantity} @
              ₹{order.price}
              <br />
              Status: {order.status} | PNL: {order.pnl} (
              {order.realized ? "Realized" : "Unrealized"})
            </div>

            <div className="order-actions" >
              <button className="buyButton" onClick={() => openOrderPad(order, "buy")}>Buy</button>
              <button className="sellButton" onClick={() => openOrderPad(order, "sell")}>Sell</button>
            </div>
          </li>
        ))}
      </ul>
      <FAB stockList={orders} onAction={openOrderPad} />
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

export default OrderbookScreen;
