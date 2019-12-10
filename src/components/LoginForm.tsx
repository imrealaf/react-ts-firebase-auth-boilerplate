/**
 *  LoginForm
 *
 *  @type Component
 *  @desc the login form
 */

import React, { useState, useRef } from "react";
import { Form, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Preloader } from "../components/ui";
import { useLogin, useFacebookLogin } from "../hooks";

const LoginForm: React.FC = () => {
  /*
   *  Field states
   */
  const [username, setUsername] = useState(null) as any;
  const [password, setPassword] = useState(null) as any;

  /*
   *  Element refs
   */
  const usernameRef = useRef() as any;
  const passwordRef = useRef() as any;

  /*
   *  Email login api
   */
  const login = useLogin([username, usernameRef], [password, passwordRef]);

  /*
   *  Facebook login api
   */
  const loginWithFacebook = useFacebookLogin();

  /*
   *  Render
   */
  return (
    <React.Fragment>
      <Form
        noValidate
        onSubmit={login.handleSubmit}
        className="login-form"
        style={login.pending ? { display: "none" } : { paddingTop: "20px" }}
      >
        <Form.Group controlId="username">
          <Form.Control
            isInvalid={login.usernameError && login.submitted}
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
          {login.usernameError && login.submitted ? (
            <Form.Text className="text-left text-danger">
              {login.usernameError}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            isInvalid={login.passwordError && login.submitted}
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
          {login.passwordError && login.submitted ? (
            <Form.Text className="text-left text-danger">
              {login.passwordError}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Button
          className="btn-pill mt-2"
          variant={login.valid ? "primary" : "secondary"}
          disabled={!login.valid}
          size="lg"
          type="submit"
        >
          <strong>Log In</strong>
        </Button>
        <div className="login-form_other mt-4">
          <p
            className="text-secondary pt-3 pl-3 pr-3"
            style={{ borderTop: "1px solid #eee" }}
          >
            <small>OR CONNECT WITH</small>
          </p>
          <div className="login-form_social mb-2">
            <FontAwesomeIcon
              icon={["fab", "facebook"]}
              size="3x"
              onClick={loginWithFacebook}
            />
            <FontAwesomeIcon icon={["fab", "google"]} size="3x" />
            <FontAwesomeIcon icon={["fab", "microsoft"]} size="3x" />
          </div>
        </div>
      </Form>
      <Preloader show={login.pending} color="primary" text="Signing you in.." />
    </React.Fragment>
  );
};

export default LoginForm;
