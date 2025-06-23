import { useNavigate,useLocation } from 'react-router-dom';
import './BottomBar.css'

function BottomBar() {
  const navigate=useNavigate();
  const currentPath=useLocation().pathname;

  return (
    <nav className='Bottom-Bar'>
      <ul className='bnav-links'>
        <li onClick={()=>{navigate("/holdings")}} className={currentPath === "/holdings" ? "active" : ""}>Holdings</li>
        <li onClick={()=>{navigate("/orderbook")}} className={currentPath === "/orderbook" ? "active" : ""}>OrderBook</li>
        <li onClick={()=>{navigate("/positions")}} className={currentPath === "/positions" ? "active" : ""}>Positions</li>
      </ul>
    </nav>
  );
}
export default BottomBar;
