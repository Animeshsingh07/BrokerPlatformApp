import "./Login.css";
import closeIcon from "../../assets/Icons/close.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { mockLogin } from "../../API/Auth";

function Login({ setIsLoggedIn }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHomeClick = () => {
    navigate("/");
  };

  const handleLogin = async () => {
    setError(""); // clear any previous error

    if (!email || !password) {
      setError("Email and password are required.");
      return;
    }

    setLoading(true);
    try {
      const response = await mockLogin(email, password);
      console.log("Logged in successfully:", response);
      setIsLoggedIn(true);
      navigate("/holdings", { replace: true });
    } catch (err) {
      if (err.status === 400) {
        setError("Invalid credentials.");
      } else if (err.status === 500) {
        setError("Server error. Please try again later.");
      } else {
        setError("Unexpected error.");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="Log-in">
      <div className="loginInfo">
        <img
          className="Close"
          src={closeIcon}
          alt="close"
          onClick={handleHomeClick}
        />
        <div className="banner">
          <img src="src\assets\Icons\logoliquide.png" alt="Logo" />
          <h1>Liquide</h1>
        </div>
        <div className="detailContainer">
          <div className="emailContainer">
            <input
              className="email"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="passwordContainer">
            <input
              className="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>

        <div className="btn">
          <button className="loginbtn" onClick={handleLogin}>
            Log In
          </button>
        </div>
        {loading && <div className="loader"></div>}
        {error && (
          <p className="error" style={{ color: "red", marginTop: "0.5rem" }}>
            {error}
          </p>
        )}
      </div>
    </div>
  );
}

export default Login;
