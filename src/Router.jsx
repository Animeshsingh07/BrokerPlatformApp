import { Routes, Route, Navigate } from "react-router-dom";
import Home from './components/Home/Home.jsx';
import BottomBar from './components/BottomBar/BottomBar.jsx';
import Login from "./screens/Login/Login.jsx";
import Holdings from "./screens/Holdings/Holdings.jsx";
import OrderBook from "./screens/OrderBook/OrderBook.jsx";
import Positions from "./screens/Positions/Positions.jsx";
import OrderPad from "./components/OrderPad/OrderPad.jsx";

function Router({ isLoggedIn, setIsLoggedIn, setSelectedBroker }) {
  return (
    <Routes>
      <Route
        path="/login"
        element={
          <>
            <Home setSelectedBroker={setSelectedBroker} />
            <Login setIsLoggedIn={setIsLoggedIn} />
          </>
        }
      />

      {/* Protected Routes */}
      {isLoggedIn && (
        <>
          <Route
            path="/holdings"
            element={<><Holdings /><BottomBar /><OrderPad /></>}
          />
          <Route
            path="/orderBook"
            element={<><OrderBook /><BottomBar /><OrderPad /></>}
          />
          <Route
            path="/positions"
            element={<><Positions /><BottomBar /><OrderPad /></>}
          />
        </>
      )}

      {/* Redirect from "/" to "/holdings" if logged in */}
      <Route
        path="/"
        element={
          isLoggedIn
            ? <Navigate to="/holdings" replace />
            : <Home setSelectedBroker={setSelectedBroker} />
        }
      />

      {/* Catch all unknown routes */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}

export default Router;
