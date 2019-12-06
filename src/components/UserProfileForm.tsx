/**
 *  LoginForm
 *
 *  @type Component
 *  @desc the login form
 */

import React, { useState, useRef } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Preloader } from "../components/ui";
import { useProfile, useModal, useUploadPhoto } from "../hooks";

interface Props {
  user: any;
  setEdit: any;
}

const UserProfileForm: React.FC<Props> = ({ user, setEdit }) => {
  // State
  const [photo, setPhoto] = useState(null) as any;
  const [firstName, setFirstName] = useState(user.data.firstName) as any;
  const [lastName, setLastName] = useState(user.data.lastName) as any;
  const [displayName, setDisplayName] = useState(user.data.displayName) as any;

  // Refs
  const photoRef = useRef() as any;
  const firstNameRef = useRef() as any;
  const lastNameRef = useRef() as any;
  const displayNameRef = useRef() as any;

  // Modal api
  const [
    showModal,
    handleShowModal,
    handleCloseModal,
    setShowModal
  ] = useModal();

  // Photo upload api
  const [filePending, fileProgress, fileError] = useUploadPhoto(
    photo,
    user,
    setShowModal
  ) as any;

  // Profile api
  const [] = useProfile({
    firstName,
    lastName
  });

  const uploadPhotoModal = () => {
    return (
      <Modal show={showModal} onHide={handleCloseModal}>
        <Modal.Header closeButton>
          <Modal.Title>Upload photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {filePending ? (
            <div className="text-center">
              <Preloader show={true} />
            </div>
          ) : (
            <React.Fragment>
              <div className="custom-file">
                <Form.Control
                  isInvalid={fileError}
                  type="file"
                  className="custom-file-input"
                  id="photo"
                  aria-describedby="photo"
                  ref={photoRef}
                  onChange={(e: React.FormEvent) => {
                    const element = e.target as HTMLFormElement;
                    setPhoto(element.files[0]);
                  }}
                />
                <label className="custom-file-label" htmlFor="photo">
                  Choose photo ...
                </label>
              </div>
              {fileError ? (
                <Form.Text className="text-danger">{fileError}</Form.Text>
              ) : null}
            </React.Fragment>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-pill"
            variant="secondary"
            onClick={handleCloseModal}
          >
            <strong>Cancel</strong>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  return (
    <React.Fragment>
      <Form noValidate className="user-profile-form">
        <Row>
          <Col className="text-center">
            <div
              className="user-profile-photo"
              style={{ backgroundImage: `url(${user.data.photoURL})` }}
            ></div>
            <div className="mb-4 mt-2">
              <Button className="btn-pill" size="sm" onClick={handleShowModal}>
                <FontAwesomeIcon className="mr-1" icon={["fas", "camera"]} />{" "}
                <strong>Upload photo</strong>
              </Button>
            </div>
          </Col>
        </Row>
        <Row>
          <Col md={6}>
            <Form.Group controlId="firstName">
              <Form.Label>
                <strong>First name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First name"
                ref={firstNameRef}
                defaultValue={firstName}
                onChange={() => {
                  setFirstName(firstNameRef.current.value);
                }}
                size="lg"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="lastName">
              <Form.Label>
                <strong>First name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last name"
                ref={lastNameRef}
                defaultValue={lastName}
                onChange={() => {
                  setLastName(lastNameRef.current.value);
                }}
                size="lg"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="displayName">
              <Form.Label>
                <strong>Display name</strong>
              </Form.Label>
              <Form.Control
                type="text"
                name="displayName"
                placeholder="Display name"
                ref={displayNameRef}
                defaultValue={displayName}
                onChange={() => {
                  setDisplayName(displayNameRef.current.value);
                }}
                size="lg"
              />
            </Form.Group>
          </Col>
        </Row>
        <Row>
          <Col>
            <Form.Group controlId="email">
              <Form.Label>
                <strong>Email address</strong>
              </Form.Label>
              <Form.Control
                readOnly
                type="text"
                name="email"
                placeholder="Email address"
                defaultValue={user.data.email}
                size="lg"
              />
            </Form.Group>
          </Col>
        </Row>
        <hr className="my-4" />
        <div className="text-right">
          <Button
            className="btn-pill"
            variant="primary"
            size="lg"
            type="submit"
          >
            <strong>Save</strong>
          </Button>
          <Button
            className="btn-pill ml-2"
            variant="outline-secondary"
            size="lg"
            onClick={() => {
              setEdit(false);
            }}
          >
            <strong>Cancel</strong>
          </Button>
        </div>
      </Form>
      {uploadPhotoModal()}
    </React.Fragment>
  );
};

export default UserProfileForm;
