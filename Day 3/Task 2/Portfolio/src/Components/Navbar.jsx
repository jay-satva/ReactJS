import { Link } from "react-router-dom";
import './navbar.css';
function Navbar({ title }) {
  return (
    <div className='nav-container'>
      <div className='nav-brand'>{title}</div>
      <ul>
        <li><Link to="/" style={{color:'white', textDecoration:'none'}}>Home</Link></li>
        <li><Link to="/about" style={{color:'white', textDecoration:'none'}}>About</Link></li>
        <li><Link to="/user/101" style={{color:'white', textDecoration:'none'}}>User</Link></li>
      </ul>
    </div>
  )
}

export default Navbar;
