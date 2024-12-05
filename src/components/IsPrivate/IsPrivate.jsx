import { useContext } from "react";
import { AuthContext } from "../../context/auth.context";
import { Navigate } from "react-router-dom";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) <p>Loading ...</p>;
  if (!isLoggedIn) {
    return <Navigate to={"/"} />;
  } else {
    return children;
  }
}

export default IsPrivate;
