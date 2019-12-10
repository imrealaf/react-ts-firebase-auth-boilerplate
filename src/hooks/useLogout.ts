/**
 *  useLogout
 *
 *  @type Custom Hook
 *  @desc handles login form validation and submission
 */

import { authModel } from "../firebase/models";

export default () => {
  /* 
    Log out function
  */
  const logout = () => {
    authModel.doSignOut();
  };

  /* 
    Return data for component consumption
  */
  return logout;
};
