/**
 *  MyAccount
 *
 *  @type Component
 *  @desc my account page that display user information. protected page
 *  @scope private
 */

import React, { useContext, useState } from "react";
import { Container, Row, Col, Jumbotron, Button } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Page } from "../components/hoc";
import { UserProfileForm } from "../components";
import { UserContext } from "../firebase/UserContext";
import { userModel } from "../firebase/models";

const MyAccount: React.FC = () => {
  const user = useContext(UserContext) as any;
  const [edit, setEdit] = useState(false);

  const editMode = () => {
    return (
      <React.Fragment>
        <div id="content">
          <Container className="py-4">
            <h1>Edit Profile</h1>
            <hr className="my-4" />
            <UserProfileForm user={user} setEdit={setEdit} />
          </Container>
        </div>
      </React.Fragment>
    );
  };

  const displayMode = () => {
    return (
      <React.Fragment>
        <Jumbotron className="user-profile-header">
          <Container>
            <Row>
              <Col sm={6}>
                <div
                  className="user-profile-photo has-border"
                  style={{ backgroundImage: `url(${user.data.photoURL})` }}
                ></div>
              </Col>
              <Col sm={6}>
                <h1>{userModel.getDisplayName(user.data)}</h1>
                <p className="text-secondary">{user.data.email}</p>
                <Button
                  className="btn-pill"
                  size="sm"
                  onClick={() => {
                    setEdit(true);
                  }}
                >
                  <FontAwesomeIcon className="mr-1" icon={["fas", "edit"]} />{" "}
                  <strong>Edit profile</strong>
                </Button>
              </Col>
            </Row>
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

  return user !== null ? (
    <Page title="My Account">{edit ? editMode() : displayMode()}</Page>
  ) : null;
};

export default MyAccount;
