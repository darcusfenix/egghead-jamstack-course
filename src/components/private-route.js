import React, { useEffect } from "react";
import { navigate } from "gatsby";
import { useAuth } from "react-use-auth";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, login, logout } = useAuth();
  useEffect(() => {
    if (!isAuthenticated()) {
      navigate("/account/login");
    }
  }, []);
  return <Component {...rest} />;
};
export default PrivateRoute;
