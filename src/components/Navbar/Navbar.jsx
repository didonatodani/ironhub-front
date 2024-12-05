import "./Navbar.css";
import Logo from "../../assets/Ironhub-logo.png";

import { useContext } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  console.log(user);

  return (
    <div className="navbar-container">
      <nav className="navbar">
        <div className="logo">
          <NavLink to={"/"}>
            <img width={120} src={Logo} alt="ironhub-logo" />
          </NavLink>
        </div>
        {isLoggedIn ? (
          <ul className="links logged-in">
            {/* fix path of these two navlinks */}
            <NavLink to={"/:userId"}> 
              <li>My Profile</li>
            </NavLink>
            <NavLink to={"/:userId/"}>
              <li>My Posts</li>
            </NavLink>
            <button onClick={logOut}>
              <li>Log Out</li>
            </button>
          </ul>
        ) : (
          <ul className="links logged-out">
            <NavLink to={"/auth/signup"}>
              <li>Signup</li>
            </NavLink>
            <NavLink to={"/auth/login"}>
              <li>Login</li>
            </NavLink>
          </ul>
        )}
      </nav>
    </div>
  );
}

export default Navbar;
