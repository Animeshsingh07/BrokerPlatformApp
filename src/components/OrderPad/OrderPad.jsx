import React, { useState, useEffect } from 'react';
import './OrderPad.css';

function OrderPad({ type = "buy", stock, onClose }) {
  if (!stock) return null;
  const isBuy = type.toLowerCase() === "buy";

  const [price, setPrice] = useState(stock.ltp || "");
  const [quantity, setQuantity] = useState("");

  useEffect(() => {
    setPrice(stock.ltp || "");
  }, [stock]);

  return (
    <div className="orderpad-overlay">
      <div className={`orderpad-container ${isBuy ? "buy" : "sell"}`}>
        <h2>{isBuy ? "Buy" : "Sell"} Order</h2>

        {/* Stock Info */}
        <div className="stock-info">
          <strong>Stock : {stock.symbol}</strong><br />
          <strong>LTP : ₹{stock.ltp}</strong>
          {!isBuy && (
            <>
              <br />
              <strong>Quantity Owned :{stock.quantity}</strong> 
            </>
          )}
        </div>

        <label>Quantity</label>
        <input
          placeholder="Enter quantity"
          value={quantity}
          onChange={(e) => setQuantity(e.target.value)}
        />

        <label>Price</label>
        <input
          placeholder="Enter price"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />

        <label>Order Type</label>
        <select className='OrderTypeSelect'>
          <option value="market">Market</option>
          <option value="limit">Limit</option>
        </select>

        <div className="orderpad-actions">
          <button onClick={onClose} className="cancel-btn">Cancel</button>
          <button className="submit-btn">{isBuy ? "Buy" : "Sell"}</button>
        </div>
      </div>
    </div>
  );
}

export default OrderPad;
