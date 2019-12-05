/**
 *  Home
 *
 *  @type Component
 *  @desc the home page
 */

import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Container, Jumbotron, Button } from "react-bootstrap";

import { UserContext } from "../firebase/UserContext";

const Home: React.FC = () => {
  const user = useContext(UserContext);
  return (
    <React.Fragment>
      <Jumbotron>
        <Container>
          <h1>Home</h1>
          <p>This is the home page which is public!</p>
          <Link className="btn btn-primary btn-lg" to="/login">
            <strong>Login</strong>
          </Link>
        </Container>
      </Jumbotron>
      <div id="content">
        <Container>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer nec
            cursus erat, in pulvinar nisl. Ut et arcu quam. Donec et risus id
            sapien tristique volutpat at quis ipsum. Sed nisl massa, commodo et
            lacus ac, fringilla interdum est. Nam in justo vel purus rhoncus
            cursus. Vestibulum non enim vel nisi dictum tempor. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. Etiam et accumsan nibh. Fusce auctor ex vitae
            tincidunt rhoncus.
          </p>
        </Container>
      </div>
    </React.Fragment>
  );
};

export default Home;
