import { auth } from "../firebase";
import { UserProfile } from "../../types/User";
import defaultProfileImage from "../../assets/images/profile-default.png";

/*
    User properties function
  */
export const getUserProps = (user: any): UserProfile => {
  return {
    id: user.uid,
    displayName: user.displayName,
    firstName: user.firstName || null,
    lastName: user.lastName || null,
    email: user.email,
    photoURL: user.photoURL || defaultProfileImage
  };
};

export const getDisplayName = (user: any): string | boolean => {
  return user.displayName ? user.displayName : "User";
};

export const doUpdateUserPhotoURL = (url: string) => {
  let currentUser = auth.currentUser as any;
  return currentUser.updateProfile({
    photoURL: url
  });
};

export const doUpdateUser = (data: any) => {
  let currentUser = auth.currentUser as any;
  return currentUser.updateProfile({
    displayName: data.displayName
  });
};
