/**
 *  useLogout
 *
 *  @type Custom Hook
 *  @desc handles login form validation and submission
 */

import { firebase } from "../firebase";
import { userModel } from "../firebase/models";

export default (data: any, setEdit: any, user: any) => {
  const updateProfile = async () => {
    try {
      await userModel.doUpdateUser(data);
      user.update(userModel.getUserProps(firebase.auth.currentUser));
      setEdit(false);
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmitHandler = (e: React.FormEvent) => {
    e.preventDefault();
    updateProfile();
  };

  /* 
    Return data for component consumption
  */
  return [onSubmitHandler];
};
