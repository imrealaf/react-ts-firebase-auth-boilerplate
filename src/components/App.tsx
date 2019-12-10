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
import { Home, Login, Dashboard, MyAccount } from "../pages";

// Auth
import { UserContext } from "../firebase/UserContext";
import { useAuth } from "../hooks";

interface Props extends RouteComponentProps {
  currentUser: any;
}

const App: React.FC<Props> = ({ currentUser, location }) => {
  /*
   *  Auth API
   *  get user and update method
   */
  const auth = useAuth(currentUser) as any;

  /*
   *  Add font awesome library
   */
  library.add(fas, fab);

  /*
   *  Render
   */
  return (
    <UserContext.Provider value={auth}>
      <React.Fragment>
        <Preload>
          <FontAwesomeIcon
            className="text-primary"
            icon={["fas", "gem"]}
            size="4x"
          />
        </Preload>
        {location.pathname !== routes.LOGIN ? <Navigation /> : null}
        <main id="main" role="main">
          <Switch>
            <RedirectRoute
              exact
              path={routes.HOME}
              condition={!currentUser}
              to={routes.DASHBOARD}
            >
              <Home />
            </RedirectRoute>
            <RedirectRoute
              exact
              path={routes.LOGIN}
              condition={!currentUser}
              to={routes.DASHBOARD}
            >
              <Login />
            </RedirectRoute>
            <RedirectRoute
              exact
              path={routes.DASHBOARD}
              condition={currentUser}
              to={routes.LOGIN}
            >
              <Dashboard />
            </RedirectRoute>
            <RedirectRoute
              exact
              path={routes.MY_ACCOUNT}
              condition={currentUser}
              to={routes.LOGIN}
            >
              <MyAccount />
            </RedirectRoute>
          </Switch>
        </main>
      </React.Fragment>
    </UserContext.Provider>
  );
};

export default withRouter(App);
