/**
 *  useLogin
 *
 *  @type Custom Hook
 *  @desc handles login form validation and submission
 */

import { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import validator from "validator";

import config from "../constants/config";
import * as routes from "../constants/routes";
import * as authCodes from "../constants/authCodes";
import { authModel } from "../firebase/models";

export default (usernameData: any[], passwordData: any[]) => {
  // Get history
  const history = useHistory();

  // Capture values
  const username = usernameData[0];
  const usernameRef = usernameData[1];
  const password = passwordData[0];
  const passwordRef = passwordData[1];

  /* 
    Create state
  */
  const [usernameError, setUsernameError] = useState(false) as any;
  const [passwordError, setPasswordError] = useState(false) as any;
  const [valid, setValid] = useState(false) as any;
  const [pending, setPending] = useState(false) as any;
  const [submitted, setSubmitted] = useState(false) as any;

  /* 
    Run when username or password is updated
  */
  useEffect(() => {
    if (username) {
      validateUsername();
    }
    if (password) {
      validatePassword();
    }
  }, [username, password]);

  /* 
    Run when usernameError or passwordError is updated
  */
  useEffect(() => {
    if (usernameError || passwordError) {
      setValid(false);
    }
    if (username && !usernameError && password && !passwordError) {
      setValid(true);
    }
  }, [usernameError, passwordError]);

  /* 
    Login function
  */
  const login = async () => {
    try {
      await authModel.doSignInWithEmailAndPassword(username, password);
      if (submitted) setPending(false);
      history.push(routes.DASHBOARD);
    } catch (error) {
      if (error) setPending(false);
      handleAuthError(error);
    }
  };

  /* 
    Submit handler
  */
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    setSubmitted(true);

    if (usernameError === false && passwordError === false) {
      setPending(true);
      setTimeout(login, 2000);
    }
  };

  /* 
    Validate username function
  */
  const validateUsername = () => {
    if (!username || !username.trim().length) {
      setUsernameError(true);
      return;
    } else if (!validator.isEmail(username.trim())) {
      setUsernameError(config.auth.validationErrors().usernameValidEmail);
      return;
    } else {
      setUsernameError(false);
    }
  };

  /* 
    Validate password function
  */
  const validatePassword = () => {
    if (!password || !password.trim().length) {
      setPasswordError(true);
      return;
    } else if (password.trim().length < config.auth.minPasswordLength) {
      setPasswordError(config.auth.validationErrors().passwordMinLength);
      return;
    } else {
      setPasswordError(false);
    }
  };

  /* 
    Handle auth error function
  */
  const handleAuthError = (authError: any) => {
    switch (authError.code) {
      // Focus on username
      case authCodes.ERROR_USERNAME:
      case authCodes.ERROR_NOT_FOUND:
        usernameRef.current.focus();
        setUsernameError(authError.message);
        break;

      // Focus on password
      case authCodes.ERROR_PASSWORD:
      case authCodes.ERROR_TOO_MANY_ATTEMPTS:
        passwordRef.current.focus();
        setPasswordError(authError.message);
        break;
    }
  };

  /* 
    Return data for component consumption
  */
  return {
    usernameError,
    passwordError,
    valid,
    pending,
    handleSubmit,
    submitted
  };
};
