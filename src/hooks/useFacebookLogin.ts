/**
 *  useFacebookLogin
 *
 *  @type Custom Hook
 *  @desc handles logging in with Facebook
 */

import { firebase } from "../firebase";

export default () => {
  // Create provider
  const provider = new firebase.authConstructor.FacebookAuthProvider();

  const loginWithFacebook = async () => {
    try {
      firebase.auth.signInWithRedirect(provider);
      const result = (await firebase.auth.getRedirectResult()) as any;
      // This gives you a Facebook Access Token. You can use it to access the Facebook API.
      const token = result.credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      console.log(token, user);
    } catch (error) {
      console.log(error);
    }
  };

  /* 
    Return data for component consumption
  */
  return loginWithFacebook;
};
