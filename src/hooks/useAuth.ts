/**
 *  useAuth
 *
 *  @type Custom Hook
 *  @desc handles authentication state
 */

import { useState, useEffect } from "react";
import { firebase } from "../firebase";
import { userModel } from "../firebase/models";
import { UserProfile } from "../types/User";

export default () => {
  /* 
    Create state
  */
  const [user, setUser] = useState(null) as any;

  /* 
    Run this when the component using it is mounted
  */
  useEffect(() => {
    // Async setUserWithProfile function
    const setUserWithProfile = async (user: any) => {
      // Get profile from firestore db ..
      try {
        const query = await userModel.getUserProfile(user.uid);

        if (query.docs.length) {
          const data = query.docs.map(doc => {
            return doc.data();
          })[0];

          // Create merged profile with user props
          const { email, uid } = user;
          const userWithProfile = {
            ...data,
            email,
            id: uid
          } as UserProfile;

          // Update state with profile
          setUser(userWithProfile);

          console.log(userWithProfile);
        }

        // Error getting profile ..
      } catch (error) {
        // Do nothing.
      }
    };

    // Run this when Auth state has changed ..
    firebase.auth.onAuthStateChanged((authUser: any) => {
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
