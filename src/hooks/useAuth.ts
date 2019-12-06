/**
 *  useAuth
 *
 *  @type Custom Hook
 *  @desc handles authentication state
 */

import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { userModel } from "../firebase/models";

export default (currentUser: any) => {
  /* 
    Create state
  */
  const [user, setUser] = useState(
    currentUser ? userModel.getUserProps(currentUser) : null
  ) as any;

  /* 
    Run this when the component using it is mounted
  */
  useEffect(() => {
    // Run this when Auth state has changed ..
    firebase.auth.onAuthStateChanged((authUser: any) => {
      if (authUser) {
        console.log(authUser);
        setUser(userModel.getUserProps(authUser));
      } else {
        setUser(null);
      }
    });
  }, []);

  /* 
    Return data for component consumption
  */
  return [user, setUser];
};
