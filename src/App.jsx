import Navbar from "./components/Navbar/Navbar.jsx";
import Router from "./Router.jsx";
import { useState, useEffect } from "react";
import { BrowserRouter } from "react-router-dom";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [selectedBroker, setSelectedBroker] = useState(() => {
    return sessionStorage.getItem("broker") || "";
  });

  useEffect(() => {
    sessionStorage.setItem("broker", selectedBroker);
  }, [selectedBroker]);

  return (
    <BrowserRouter>
      <Navbar
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        selectedBroker={selectedBroker}
      />
      <Router
        isLoggedIn={isLoggedIn}
        setIsLoggedIn={setIsLoggedIn}
        setSelectedBroker={setSelectedBroker}
      />
    </BrowserRouter>
  );
}

export default App;
