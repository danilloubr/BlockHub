import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

import { ToastContainer } from "react-toastify";
import { AuthContext } from "./contexts/auth";
import AuthProvider from "./contexts/auth";

import Projects from "./routers/Projects/Projects";
import MoreInfos from "./routers/MoreInfos/MoreInfos";
import PrivateRoute from "./routers/Private/PrivateRouter";
import Login from "./routers/Login/Login";
import Register from "./routers/Register/Register";
import Dashboard from "./routers/Dashboard/Dashboard";

import "./app.css";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const auth = AuthProvider(AuthContext);

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
          <PrivateRoute
            exact
            path="/moreinfos/:id"
            component={MoreInfos}
            isPrivate
          />
        </Switch>
      </Router>
    </AuthProvider>
  );
}
export default App;
