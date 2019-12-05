/**
 *  Login
 *
 *  @type Component
 *  @desc the home page
 */

import React, { useContext } from "react";
import { Link, Redirect } from "react-router-dom";
import { Container, Row, Col, Card } from "react-bootstrap";
import * as routes from "../constants/routes";
import { UserContext } from "../firebase/UserContext";
import { LoginForm } from "../components";

const Login: React.FC = () => {
  const user = useContext(UserContext);
  return user ? (
    <Redirect to={routes.DASHBOARD} />
  ) : (
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
            <div className="mt-2">
              <Link to="/">
                <small>Back to home</small>
              </Link>
            </div>
          </Col>
        </Row>
      </Container>
    </React.Fragment>
  );
};

export default Login;
