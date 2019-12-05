/**
 *  Navbar
 *
 *  @type UI Component
 *  @desc a simple preloader for displaying while waiting for app to do something
 */

import React, { useContext } from "react";
import { NavLink } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../constants/config";
import * as routes from "../constants/routes";
import { publicNav, privateNav } from "../constants/navigation";
import { UserContext } from "../firebase/UserContext";
import { authModel } from "../firebase/models";

interface Props {
  currentRoute: string;
}

const Navigation: React.FC<Props> = ({ currentRoute }) => {
  const user = useContext(UserContext) as any;

  const getItems = () => {
    const items = user ? privateNav : publicNav;
    return items.map((item, i) => {
      return (
        <React.Fragment key={i}>
          <NavLink className="nav-link" to={item.path}>
            {item.title}
          </NavLink>
        </React.Fragment>
      );
    });
  };

  return (
    <Navbar bg="light" expand="md">
      <Container>
        <Navbar.Brand href="#home">
          <FontAwesomeIcon
            className="mr-1 text-primary"
            icon={["fas", "gem"]}
            size="1x"
          />{" "}
          <strong>{config.appName}</strong>
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{getItems()}</Nav>
          <Nav className="ml-auto">
            {user ? (
              <NavDropdown
                title={user.displayName || ""}
                id="basic-nav-dropdown"
                alignRight
              >
                <NavDropdown.Item href="#action/3.1">
                  My Account
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item
                  onClick={() => {
                    authModel.doSignOut();
                  }}
                >
                  Log Out
                </NavDropdown.Item>
              </NavDropdown>
            ) : (
              <NavLink className="nav-link" to={routes.LOGIN}>
                Log In
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
