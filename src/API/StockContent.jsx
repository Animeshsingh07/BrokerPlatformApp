import React, { createContext, useState } from "react";

export const StockContext = createContext();

export function StockProvider({ children }) {
  const [stockList, setStockList] = useState([]);
  const [orderPadData, setOrderPadData] = useState(null);

  const openOrderPad = (stock, type) => {
    setOrderPadData({ stock, type });
  };

  const closeOrderPad = () => {
    setOrderPadData(null);
  };

  return (
    <StockContext.Provider
      value={{
        stockList,
        setStockList,
        orderPadData,
        openOrderPad,
        closeOrderPad,
      }}
    >
      {children}
    </StockContext.Provider>
  );
}