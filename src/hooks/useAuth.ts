/**
 *  useCustomHook
 *
 *  @type Custom Hook
 *  @desc to do ..
 */

import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { userModel } from "../firebase/models";
import { Profile } from "../types/Profile";

export default () => {
  /* 
    Create state
  */
  const [user, setUser] = useState(null) as any;

  /* 
    Run this when the component using it is mounted
  */
  useEffect(() => {
    // Async setUserWithProfileFunction
    const setUserWithProfile = async (user: any) => {
      // Get profile from firestore db ..
      try {
        const query = await userModel.getUserProfile(user.uid);

        if (query.docs.length) {
          const data = query.docs.map(doc => {
            return doc.data();
          })[0];

          // Create merged profile with user props
          const userWithProfile = {
            ...data,
            username: user.email,
            id: user.uid
          } as Profile;

          // Update state with profile
          setUser(userWithProfile);
        }

        // Error getting profile ..
      } catch (error) {
        // Do nothing.
      }
    };

    // Run this when Auth state has changed ..
    firebase.auth.onAuthStateChanged((authUser: any) => {
      console.log("Auth changes..");
      if (authUser) {
        setUser(authUser);
        setUserWithProfile(authUser);
      } else {
        setUser(null);
      }
    });
  }, []);

  /* 
    Return data for component consumption
  */
  return [user];
};
