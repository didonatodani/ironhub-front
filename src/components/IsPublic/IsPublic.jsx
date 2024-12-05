import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../../context/auth.context";

function IsPublic({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) <p>Loading ...</p>;
  if (isLoggedIn) {
    return <Navigate to={"/posts"} />;
  } else {
    return children;
  }
}

export default IsPublic;
