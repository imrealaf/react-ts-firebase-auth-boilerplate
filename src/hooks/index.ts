/**
 *  Custom Hooks
 *
 *  @type index
 *  @desc this file just exports all custom hooks into one object so they can be imported easier
 */

import useAuth from "./useAuth";
import useLogin from "./useLogin";
import useFacebookLogin from "./useFacebookLogin";
import useLogout from "./useLogout";
import useProfile from "./useProfile";
import useModal from "./useModal";
import useUploadPhoto from "./useUploadPhoto";

export {
  useAuth,
  useLogin,
  useFacebookLogin,
  useLogout,
  useProfile,
  useModal,
  useUploadPhoto
};
