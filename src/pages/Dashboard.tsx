/**
 *  Dashboard
 *
 *  @type Component
 *  @desc the dashboard page. acts as home page for protected area
 *  @scope private
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
