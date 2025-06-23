import "./Home.css";
import BrokerCard from "/Project/Liquide-FE-App/src/components/Brokercard/BrokerCard";
import { useNavigate } from "react-router-dom";

function Home({ setSelectedBroker }) {
   const navigate = useNavigate();

  const handleLoginClick = () => {
    navigate("/login");
  };
  return (
    <div className="Home">
      <h1>Empowering India’s
Wealth Journey</h1>
      <div className="btn-container">
        <button className="loginbtn" onClick={handleLoginClick}>Log In</button>
        <button className="signupbtn">Sign Up</button>
      </div>
      <BrokerCard setSelectedBroker={setSelectedBroker} />
    </div>
  );
}
export default Home;
