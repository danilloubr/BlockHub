import "./app.css";

import "react-toastify/dist/ReactToastify.css";

import Register from "./routers/Register/Register";
import Login from "./routers/Login/Login";
import Dashboard from "./routers/Dashboard/Dashboard";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import AuthProvider from "./contexts/auth";
import PrivateRoute from "./routers/Private/PrivateRouter";
import { ToastContainer } from "react-toastify";
import { AuthContext } from "./contexts/auth";
import Projects from "./routers/Projects/Projects";

function App() {
  const auth = AuthProvider(AuthContext);
  console.log("AUTH APP:", auth.props.value.isAuthenticated);

  return (
    <AuthProvider value={auth.props.value.isAuthenticated}>
      <ToastContainer />
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/register" component={Register} />
          <PrivateRoute
            exact
            path="/dashboard"
            component={Dashboard}
            isPrivate
          />
          <PrivateRoute exact path="/projects" component={Projects} isPrivate />
        </Switch>
      </Router>
    </AuthProvider>
  );
}
export default App;
