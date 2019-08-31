import React from "react";
import { Router } from "@reach/router";
import Layout from "../components/layout";
import PrivateRoute from "../components/private-route";
import { useAuth } from "react-use-auth";

const Profile = () => <span>Welcome</span>;
const Login = () => {
  const { login } = useAuth();
  return (
    <button
      onClick={() => {
        login();
      }}
    >
      Login
    </button>
  );
};
const Account = () => {
  return (
    <Layout>
      <Router>
        <PrivateRoute path="/account/courses" component={Profile} />
        <Login path="/account/login" />
      </Router>
    </Layout>
  );
};
export default Account;
