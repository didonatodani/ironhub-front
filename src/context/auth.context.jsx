import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);

  function storeToken(token) {
    localStorage.setItem("authToken", token);
  }

  function authenticateUser() {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      axios
        .get(`${API_URL}/auth/verify`, {
          headers: { Authorization: `Bearer ${storedToken}` },
        })
        .then((res) => {
          // if token is valid:
          const user = res.data;
          setIsLoading(false);
          setIsLoggedIn(true);
          setUser(user);
        })
        .catch((err) => {
          setIsLoading(true);
          setIsLoggedIn(false);
          setUser(null);
        });
    } else {
      setIsLoading(true);
      setIsLoggedIn(false);
      setUser(null);
    }
  }

  function removeToken(){
    localStorage.removeItem("authToken")
  }

  function logOut(){
    removeToken();
    authenticateUser()
  }

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ isLoggedIn, isLoading, user, storeToken, authenticateUser, logOut }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
