/**
 *  Index
 *
 *  @type Root
 *  @desc the root of the application where the app is mounted
 */

import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter as Router } from "react-router-dom";

import "./styles/index.scss";
import { App } from "./components";
import { firebase } from "./firebase";
import registerServiceWorker from "./registerServiceWorker";

firebase.auth.onAuthStateChanged((authUser: any) => {
  ReactDOM.render(
    <Router>
      <App currentUser={authUser} />
    </Router>,
    document.getElementById("root")
  );
});

registerServiceWorker();
