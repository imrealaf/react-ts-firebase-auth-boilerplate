/**
 *  Dashboard
 *
 *  @type Component
 *  @desc the home page
 */

import React from "react";
import { Container, Jumbotron } from "react-bootstrap";

import { Page } from "../components/hoc";

const Dashboard: React.FC = () => {
  return (
    <Page title="Dashboard">
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
    </Page>
  );
};

export default Dashboard;
