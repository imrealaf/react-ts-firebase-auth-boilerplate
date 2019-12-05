/**
 *  LoginForm
 *
 *  @type Component
 *  @desc the login form page
 */

import React, { useEffect, useState, useRef } from "react";
import { useHistory } from "react-router-dom";
import { Form, Button } from "react-bootstrap";
import validator from "validator";

import { authModel } from "../firebase/models";
import * as routes from "../constants/routes";
import * as authCodes from "../constants/authCodes";
import { Preloader } from "../components/ui";

const LoginForm: React.FC = () => {
  const history = useHistory();

  const [username, setUsername] = useState(false) as any;
  const [usernameError, setUsernameError] = useState(false) as any;
  const [password, setPassword] = useState(false) as any;
  const [passwordError, setPasswordError] = useState(false) as any;
  const [valid, setValid] = useState(false) as any;
  const [pending, setPending] = useState(false) as any;

  // Refs
  const usernameRef = useRef() as any;
  const passwordRef = useRef() as any;

  useEffect(() => {
    if (username) {
      validateUsername();
    }
    if (password) {
      validatePassword();
    }
  }, [username, password]);

  useEffect(() => {
    if (usernameError || passwordError) {
      setValid(false);
    }
    if (username && !usernameError && password && !passwordError) {
      setValid(true);
    }
  }, [usernameError, passwordError]);

  const login = async () => {
    try {
      const response = await authModel.doSignInWithEmailAndPassword(
        usernameRef.current.value,
        passwordRef.current.value
      );
      setPending(false);
      history.push(routes.DASHBOARD);
    } catch (error) {
      setPending(false);
      //console.log(error);
      handleAuthError(error);
    }
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    event.stopPropagation();

    if (usernameError === false && passwordError === false) {
      setPending(true);
      setTimeout(login, 2000);
    }
  };

  const validateUsername = () => {
    if (!username || !username.trim().length) {
      setUsernameError(true);
      return;
    } else if (!validator.isEmail(username.trim())) {
      setUsernameError("Not a valid email");
      return;
    } else {
      setUsernameError(false);
    }
  };

  const validatePassword = () => {
    if (!password || !password.trim().length) {
      setPasswordError(true);
      return;
    } else if (password.trim().length < 6) {
      setPasswordError("Password must be at least 6 chars");
      return;
    } else {
      setPasswordError(false);
    }
  };

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

  return (
    <React.Fragment>
      <Form
        noValidate
        onSubmit={handleSubmit}
        className="login-form"
        style={pending ? { display: "none" } : { paddingTop: "20px" }}
      >
        <Form.Group controlId="username">
          <Form.Control
            isInvalid={usernameError}
            className="text-center"
            type="email"
            name="username"
            placeholder="Your username"
            ref={usernameRef}
            onChange={() => {
              setUsername(usernameRef.current.value);
            }}
            size="lg"
          />
          {usernameError ? (
            <Form.Text className="text-left text-danger">
              {usernameError}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            isInvalid={passwordError}
            className="text-center"
            type="password"
            name="password"
            placeholder="Your password"
            ref={passwordRef}
            onChange={() => {
              setPassword(passwordRef.current.value);
            }}
            size="lg"
          />
          {passwordError ? (
            <Form.Text className="text-left text-danger">
              {passwordError}
            </Form.Text>
          ) : null}
        </Form.Group>
        <div>
          <Button
            variant={valid ? "success" : "secondary"}
            disabled={!valid}
            size="lg"
            type="submit"
          >
            <strong>Log In</strong>
          </Button>
        </div>
        <div className="mt-4">
          <p
            className="text-secondary p-3"
            style={{ borderTop: "1px solid #eee" }}
          >
            <small>OR CONNECT WITH</small>
          </p>
        </div>
      </Form>
      <Preloader show={pending} color="success" text="Signing you in.." />
    </React.Fragment>
  );
};

export default LoginForm;
