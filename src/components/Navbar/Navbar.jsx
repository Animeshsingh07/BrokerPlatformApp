import "./Navbar.css";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Navbar({ isLoggedIn, setIsLoggedIn, selectedBroker }) {
  const navigate = useNavigate();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLoginClick = () => {
    navigate("/login", { replace: true });
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    setDropdownOpen(false);
    sessionStorage.removeItem("broker");
    navigate("/");
  };

  return (
    <header className="Nav-Bar">
      <div className="Logo">
        <img src="src/assets/Icons/logoliquide.png" alt="Liquide Logo" />
        Liquide
      </div>

      {!isLoggedIn ? (
        <div className="navLogin" onClick={handleLoginClick}>
          Log In
        </div>
      ) : (
        <div className="nav-right">
          <div
            className="Account-button"
            onClick={() => setDropdownOpen((prev) => !prev)}
          >
            Account
            <img
              src="src/assets/Icons/arrow_drop_down.svg"
              alt="arrow drop"
              style={{ marginLeft: "4px" }}
            />
          </div>

          {dropdownOpen && (
            <div className="dropdown-menu">
              <div className="dropdown-item">Broker - {selectedBroker || "*_*"}</div>
              <div className="dropdown-item" onClick={handleLogout}>
                Logout <img className="Logout" src="src/assets/Icons/logout.svg" alt="Logout" />
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}

export default Navbar;
