/**
 *  App
 *
 *  @type Component
 *  @desc the main app container component
 *  @prop location - the location object from route props
 */

import React, { useEffect } from "react";
import { Switch, withRouter, RouteComponentProps } from "react-router-dom";

// Routing
import { addRouteAttrToDOM } from "../utils";
import * as routes from "../constants/routes";
import RedirectRoute from "./hoc/RedirectRoute";

// Pages
import { Home, Login, Dashboard } from "../pages";

// Auth
import { UserContext } from "../firebase/UserContext";
import { useAuth } from "../hooks";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  const [user] = useAuth();

  /*
   *  On route change ..
   */
  useEffect(() => {
    // add route data attribute to DOM.
    // used for page specific styling, if needed
    addRouteAttrToDOM(location);
    console.log(user);
  }, [location]);

  /*
   *  Render
   */
  return (
    <UserContext.Provider value={user}>
      <React.Fragment>
        <main id="main" role="main">
          <Switch>
            <RedirectRoute
              exact
              path={routes.HOME}
              condition={!user}
              to={routes.DASHBOARD}
            >
              <Home />
            </RedirectRoute>
            <RedirectRoute
              exact
              path={routes.LOGIN}
              condition={!user}
              to={routes.DASHBOARD}
            >
              <Login />
            </RedirectRoute>
            <RedirectRoute
              exact
              path={routes.DASHBOARD}
              condition={user}
              to={routes.LOGIN}
            >
              <Dashboard />
            </RedirectRoute>
          </Switch>
        </main>
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default withRouter(App);
