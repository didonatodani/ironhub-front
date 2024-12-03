import "./Navbar.css";
import { NavLink } from "react-router-dom";
// import Logo from "../../assets/IronHub.svg";
import "./Navbar.css"

function Navbar() {
  return (
    <div>
      <nav className="navbar">
        <div className="logo">
          <NavLink>
            {/* <img src={Logo} alt="ironhub-logo" /> */}
          </NavLink>
        </div>
        <ul className="links">
          <NavLink to="/">
            <li>About</li>
          </NavLink>
          <NavLink>
            <li>Signup</li>
          </NavLink>
          <NavLink>
            <li>Login</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
