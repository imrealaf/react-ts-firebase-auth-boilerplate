/**
 *  App
 *
 *  @type Component
 *  @desc the main app container component
 *  @prop location - the location object from route props
 */

import React from "react";
import { Switch, withRouter, RouteComponentProps } from "react-router-dom";
import { library } from "@fortawesome/fontawesome-svg-core";
import { fas } from "@fortawesome/free-solid-svg-icons";
import { fab } from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Routing
import * as routes from "../constants/routes";
import { RedirectRoute, Preload } from "./hoc";

// Components
import { Navigation } from "./";

// Pages
import { Home, Login, Dashboard } from "../pages";

// Auth
import { UserContext } from "../firebase/UserContext";
import { useAuth } from "../hooks";

const App: React.FC<RouteComponentProps> = ({ location }) => {
  // Get user
  const [user] = useAuth();

  // Add font awesome icons
  library.add(fas, fab);

  /*
   *  Render
   */
  return (
    <UserContext.Provider value={user}>
      <React.Fragment>
        <Preload>
          <FontAwesomeIcon
            className="text-primary"
            icon={["fas", "gem"]}
            size="4x"
          />
        </Preload>
        {location.pathname !== routes.LOGIN ? (
          <Navigation currentRoute={location.pathname} />
        ) : null}
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
