/**
 *  Navbar
 *
 *  @type UI Component
 *  @desc a simple preloader for displaying while waiting for app to do something
 */

import React, { useContext } from "react";
import { NavLink, Link } from "react-router-dom";
import { Container, Navbar, Nav, NavDropdown, Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import config from "../constants/config";
import * as routes from "../constants/routes";
import { publicNav, privateNav } from "../constants/navigation";
import { UserContext } from "../firebase/UserContext";
import { userModel } from "../firebase/models";
import { useLogout } from "../hooks";

// Navifation props
interface Props {}

const Navigation: React.FC<Props> = () => {
  /*
   *  Get user api
   */
  const user = useContext(UserContext) as any;

  /*
   *  Logout api
   */
  const logout = useLogout();

  /*
   *  Get items function
   */
  const getItems = () => {
    const items = user.data ? privateNav : publicNav;
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

  /*
   *  Render
   */
  return (
    <Navbar className="navigation" bg="dark" variant="dark" expand="md">
      <Container>
        <Link
          to={user.data ? routes.DASHBOARD : routes.HOME}
          className="navbar-brand text-primary"
        >
          <FontAwesomeIcon className="mr-1" icon={["fas", "gem"]} size="1x" />{" "}
          <strong>{config.appName}</strong>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">{getItems()}</Nav>
          <Nav className="ml-auto">
            {user.data ? (
              <Dropdown alignRight>
                <Dropdown.Toggle
                  className="d-flex align-items-center"
                  variant="link"
                  id="dropdown-basic"
                >
                  <span
                    className="user_photo"
                    style={{ backgroundImage: `url(${user.data.photoURL})` }}
                  ></span>
                  {userModel.getDisplayName(user.data)}
                </Dropdown.Toggle>
                <Dropdown.Menu>
                  <NavLink className="dropdown-item" to={routes.MY_ACCOUNT}>
                    My Account
                  </NavLink>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={logout}>
                    <FontAwesomeIcon
                      className="mr-1"
                      icon={["fas", "unlock"]}
                    />{" "}
                    Log Out
                  </Dropdown.Item>
                </Dropdown.Menu>
              </Dropdown>
            ) : (
              <NavLink className="nav-link" to={routes.LOGIN}>
                <FontAwesomeIcon className="mr-1" icon={["fas", "lock"]} /> Log
                In
              </NavLink>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Navigation;
