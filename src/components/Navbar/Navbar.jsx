import "./Navbar.css";
import Logo from "../../assets/Ironhub-logo.png";

import { useContext, useState } from "react";
import { AuthContext } from "../../context/auth.context.jsx";
import { NavLink } from "react-router-dom";

function Navbar() {
  const { isLoggedIn, user, logOut } = useContext(AuthContext);
  const [isDropped, setIsDropped] = useState(false);

  function showMenu() {
    setIsDropped(!isDropped);
  }

  console.log(user);


  return (
    <div className="navbar-container">
        {isLoggedIn ? (
          <>
      <nav className="navbar-logged-in">

        <div className="logo">
          <NavLink to={"/posts/"}>
            <img width={120} src={Logo} alt="ironhub-logo" />
          </NavLink>
          </div>
            <div className="dropdown">

              <button className="user-nav" onClick={showMenu}><img className="user-picture" width={50} src={user.picture}  alt="picture-user" /> </button>
              {isDropped && (
                <ul className="links logged-in">
                  <NavLink to={`/${user._id}`}>
                    <li>My Profile</li>
                  </NavLink>
                  <button onClick={logOut}>
                    <li>Log Out</li>
                  </button>
                </ul>
              )}
            </div>
       </nav>
          </>
        ) : (
          <>
           <nav className="navbar">

            <div className="logo">
              <NavLink to={"/"}>
                <img width={120} src={Logo} alt="ironhub-logo" />
              </NavLink>
            </div>
            <ul className="links logged-out">
              <NavLink to={"/auth/signup"}>
                <li>Signup</li>
              </NavLink>
              <NavLink to={"/auth/login"}>
                <li>Login</li>
              </NavLink>
            </ul>
           </nav>
          </>
        )}

      </div>
  );
}

export default Navbar;
