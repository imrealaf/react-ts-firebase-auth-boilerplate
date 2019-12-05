/**
 *  useCustomHook
 *
 *  @type Custom Hook
 *  @desc to do ..
 */

import { useHistory } from "react-router-dom";

import { firebase } from "../firebase";

export default () => {
  // Get history
  const history = useHistory();

  // Create provider
  const provider = new firebase.authConstructor.FacebookAuthProvider();

  const loginWithFacebook = async () => {
    try {
      const result = (await firebase.auth.signInWithPopup(provider)) as any;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
    } catch (error) {
      console.log(error);
    }
  };

  /* 
    Return data for component consumption
  */
  return [loginWithFacebook];
};
