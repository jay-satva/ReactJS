import { NavLink } from "react-router-dom";
import './navbar.css';
function Navbar({ title }) {
  return (
    <div className='nav-container'>
      <div className='nav-brand'>{title}</div>
      <ul>
        <li><NavLink to="/" style={{color:'white', textDecoration:'none'}}>Home</NavLink></li>
        <li><NavLink to="/about" style={{color:'white', textDecoration:'none'}}>About</NavLink></li>
        <li><NavLink to="/user/101" style={{color:'white', textDecoration:'none'}}>User</NavLink></li>
      </ul>
    </div>
  )
}

export default Navbar;
