/**
 *  UserProfileForm
 *
 *  @type Component
 *  @desc the form for updating a user's profile
 */

import React, { useState, useRef } from "react";
import { Row, Col, Form, Button, Modal } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { Preloader } from "../components/ui";
import { useProfile, useModal, useUploadPhoto } from "../hooks";

// UserProfileForm props
interface Props {
  user: any;
  setEdit: any;
}

const UserProfileForm: React.FC<Props> = ({ user, setEdit }) => {
  /*
   *  Field states
   */
  const [photo, setPhoto] = useState(null) as any;
  const [displayName, setDisplayName] = useState(user.data.displayName) as any;

  /*
   *  Element refs
   */
  const photoRef = useRef() as any;
  const displayNameRef = useRef() as any;

  /*
   *  Modal api
   */
  const modal = useModal();

  /*
   *  Photo upload api
   */
  const upload = useUploadPhoto(photo, user, modal.setShow) as any;

  /*
   *  Profile api
   */
  const [onSubmitHandler] = useProfile(
    {
      displayName
    },
    setEdit,
    user
  );

  /*
   *  Upload photo modal
   */
  const uploadPhotoModal = () => {
    return (
      <Modal show={modal.show} onHide={modal.handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Upload photo</Modal.Title>
        </Modal.Header>
        <Modal.Body className="p-4">
          {upload.pending ? (
            <div className="text-center">
              <Preloader show={true} />
            </div>
          ) : (
            <React.Fragment>
              <div className="custom-file">
                <Form.Control
                  isInvalid={upload.error}
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
              {upload.error ? (
                <Form.Text className="text-danger">{upload.error}</Form.Text>
              ) : null}
            </React.Fragment>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button
            className="btn-pill"
            variant="secondary"
            onClick={modal.handleClose}
          >
            <strong>Cancel</strong>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  };

  /*
   *  Render
   */
  return (
    <React.Fragment>
      <Form onSubmit={onSubmitHandler} noValidate className="user-profile-form">
        <Row>
          <Col className="text-center">
            <div
              className="user-profile-photo"
              style={{ backgroundImage: `url(${user.data.photoURL})` }}
            ></div>
            <div className="mb-4 mt-2">
              <Button className="btn-pill" size="sm" onClick={modal.handleShow}>
                <FontAwesomeIcon className="mr-1" icon={["fas", "camera"]} />{" "}
                <strong>Upload photo</strong>
              </Button>
            </div>
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
