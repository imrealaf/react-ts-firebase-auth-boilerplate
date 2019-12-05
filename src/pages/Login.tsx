/**
 *  Login
 *
 *  @type Component
 *  @desc the home page
 */

import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../constants/config";
import { Page } from "../components/hoc";
import { LoginForm } from "../components";

const Login: React.FC = () => {
  const history = useHistory();
  return (
    <Page title="Log In">
      <Container className="text-center py-4">
        <Row className="mt-4">
          <Col
            sm={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
          >
            <h4 className="mb-4">
              <FontAwesomeIcon
                className="mr-1 text-primary"
                icon={["fas", "gem"]}
                size="1x"
              />{" "}
              <strong>{config.appName}</strong>
            </h4>
            <Card>
              <Card.Body>
                <LoginForm />
              </Card.Body>
            </Card>
            <div className="mt-3">
              <Button
                variant="link"
                onClick={() => {
                  history.goBack();
                }}
              >
                <small>Go Back</small>
              </Button>
            </div>
          </Col>
        </Row>
      </Container>
    </Page>
  );
};

export default Login;
