/**
 *  LoginForm
 *
 *  @type Component
 *  @desc the login form
 */

import React, { useState, useRef } from "react";
import { Form, Button, OverlayTrigger, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Preloader } from "../components/ui";
import { useLogin, useFacebookLogin } from "../hooks";

const LoginForm: React.FC = () => {
  // State
  const [username, setUsername] = useState(false) as any;
  const [password, setPassword] = useState(false) as any;

  // Refs
  const usernameRef = useRef() as any;
  const passwordRef = useRef() as any;

  // Login api
  const [
    usernameError,
    passwordError,
    valid,
    pending,
    handleSubmit,
    submitted
  ] = useLogin([username, usernameRef], [password, passwordRef]);

  // Other login providers
  const [loginWithFacebook] = useFacebookLogin();

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
            isInvalid={usernameError && submitted}
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
          {usernameError && submitted ? (
            <Form.Text className="text-left text-danger">
              {usernameError}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Form.Group controlId="password">
          <Form.Control
            isInvalid={passwordError && submitted}
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
          {passwordError && submitted ? (
            <Form.Text className="text-left text-danger">
              {passwordError}
            </Form.Text>
          ) : null}
        </Form.Group>
        <Button
          className="btn-pill mt-2"
          variant={valid ? "primary" : "secondary"}
          disabled={!valid}
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
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-facebook`}>
                  <small>
                    Log in with <strong>Facebook</strong>
                  </small>
                </Tooltip>
              }
            >
              <FontAwesomeIcon
                icon={["fab", "facebook"]}
                size="3x"
                onClick={loginWithFacebook}
              />
            </OverlayTrigger>
            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-google`}>
                  <small>
                    Log in with <strong>Google +</strong>
                  </small>
                </Tooltip>
              }
            >
              <FontAwesomeIcon icon={["fab", "google"]} size="3x" />
            </OverlayTrigger>

            <OverlayTrigger
              placement="bottom"
              overlay={
                <Tooltip id={`tooltip-microsoft`}>
                  <small>
                    Log in with <strong>Microsoft</strong>
                  </small>
                </Tooltip>
              }
            >
              <FontAwesomeIcon icon={["fab", "microsoft"]} size="3x" />
            </OverlayTrigger>
          </div>
        </div>
      </Form>
      <Preloader show={pending} color="primary" text="Signing you in.." />
    </React.Fragment>
  );
};

export default LoginForm;
