/**
 *  Login
 *
 *  @type Component
 *  @desc the home page
 */

import React from "react";
import { useHistory } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";

import { LoginForm } from "../components";

const Login: React.FC = () => {
  const history = useHistory();
  return (
    <React.Fragment>
      <Container className="text-center py-4">
        <Row className="mt-4">
          <Col
            sm={{ span: 10, offset: 1 }}
            md={{ span: 6, offset: 3 }}
            lg={{ span: 4, offset: 4 }}
          >
            <h4 className="mb-4">Logo</h4>
            <Card>
              <Card.Body>
                <LoginForm />
              </Card.Body>
            </Card>
            <div className="mt-3">
              <a
                href="javascript:void"
                onClick={() => {
                  history.goBack();
                }}
              >
                <small>Go Back</small>
              </a>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;
