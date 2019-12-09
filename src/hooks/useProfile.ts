/**
 *  useLogout
 *
 *  @type Custom Hook
 *  @desc handles login form validation and submission
 */

import { useEffect, useState } from "react";

import { firebase } from "../firebase";
import { userModel } from "../firebase/models";

export default (data: any, setEdit: any, user: any) => {
  //   const [photo, setPhoto] = useState(null) as any;

  useEffect(() => {}, [data]);

  const updateProfile = async () => {
    try {
      await userModel.doUpdateUserProfile(data);
      user.update(userModel.getUserProps(firebase.auth.currentUser));
      console.log(data);
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
