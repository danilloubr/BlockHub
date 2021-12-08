import { useContext, useEffect } from "react";
import { useHistory } from "react-router";
import { Route } from "react-router-dom";

import { AuthContext } from "../../contexts/auth";

export default function PrivateRoute({
  component: Component,
  isPrivate,
  ...rest
}) {
  const history = useHistory();

  const { login, logout, isAuthenticated } = useContext(AuthContext);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const tokenValited = localStorage.getItem("tokenValited");

    if (token === tokenValited) {
      login();
    } else {
      logout();
      history.push("/");
    }
  }, [login, history, logout]);

  useEffect(() => {
    if (!isAuthenticated && isPrivate) {
      return history.push("/");
    }

    if (isAuthenticated && !isPrivate) {
      return history.push("/dashboard");
    }
  }, [isAuthenticated, history, isPrivate]);

  return <Route {...rest} render={(props) => <Component {...props} />} />;
}
