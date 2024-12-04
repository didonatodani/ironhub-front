import "./Navbar.css";
import { NavLink } from "react-router-dom";
import Logo from "../../assets/Ironhub-logo.png";
import "./Navbar.css"

function Navbar() {
  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <NavLink to={"/"}>
            <img width={120} src={Logo} alt="ironhub-logo" />
          </NavLink>
        </div>
        <ul className="links">
          <NavLink to={"/auth/signup"}>
            <li>Signup</li>
          </NavLink>
          <NavLink to={"/auth/login"}>
            <li>Login</li>
          </NavLink>
        </ul>
      </nav>
    </div>
  );
}

export default Navbar;
