/**
 *  Navbar
 *
 *  @type UI Component
 *  @desc a simple preloader for displaying while waiting for app to do something
 */

import React, { useContext } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";

import config from "../constants/config";
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
        <React.Fragment>
          <Nav.Link href={item.path} active={currentRoute === item.path}>
            {item.title}
          </Nav.Link>
        </React.Fragment>
      );
    });
  };

  return (
    <Navbar bg="light" expand="md">
      <Navbar.Brand href="#home">{config.appName}</Navbar.Brand>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
        <Nav className="mr-auto">{getItems()}</Nav>
        <Nav className="ml-auto">
          {user ? (
            <NavDropdown title={user.name} id="basic-nav-dropdown" alignRight>
              <NavDropdown.Item href="#action/3.1">My Account</NavDropdown.Item>
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
            <Nav.Link href="/login">Sign in</Nav.Link>
          )}
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
