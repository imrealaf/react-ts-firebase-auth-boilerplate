/**
 *  Dashboard
 *
 *  @type Component
 *  @desc the home page
 */

import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

const Dashboard: React.FC = () => {
  return (
    <React.Fragment>
      <Jumbotron>
        <Container>
          <h1>Dashboard</h1>
        </Container>
      </Jumbotron>
      <div id="content">
        <Container>
          <p>This is a protected page!</p>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Dashboard;
