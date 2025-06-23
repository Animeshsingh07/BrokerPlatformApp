import "./BrokerCard.css";
import { useNavigate } from "react-router-dom";

function BrokerCard({ setSelectedBroker }) {
  const navigate = useNavigate();

  const handleBrokerClick = (brokerName) => {
    sessionStorage.setItem("broker", brokerName);
    if (setSelectedBroker) {
      setSelectedBroker(brokerName);
    }
    navigate("/Login");
  };

  return (
    <ul className="BrokerCard">
      <li data-label="Grow" onClick={() => handleBrokerClick("Grow")}><img src="https://assets.smallcase.com/smallcase/assets/brokerLogo/small/groww.svg"/></li>
      <li data-label="Zerodha" onClick={() => handleBrokerClick("Zerodha")}><img src="https://assets.smallcase.com/smallcase/assets/brokerLogo/small/kite.svg"/></li>
      <li data-label="Angel One" onClick={() => handleBrokerClick("Angel One")}><img src="https://assets.smallcase.com/smallcase/assets/brokerLogo/small/angelbroking.svg"/></li>
      <li data-label="Upstox" onClick={() => handleBrokerClick("Upstox")}><img src="https://assets.smallcase.com/smallcase/assets/brokerLogo/small/upstox.svg"/></li>
      <li data-label="ICICIdirect" onClick={() => handleBrokerClick("ICICIdirect")}><img src="https://assets.smallcase.com/smallcase/assets/brokerLogo/small/icici.svg"/></li>
      <li data-label="TrustLine" onClick={() => handleBrokerClick("TrustLine")}><img src="https://assets.smallcase.com/smallcase/assets/brokerLogo/small/trustline.svg"/></li>
    </ul>
  );
}

export default BrokerCard;