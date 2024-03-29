import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar, Nav, Container, Modal, Tab } from 'react-bootstrap';
import SignUpForm from './SignupForm';
import LoginForm from './LoginForm';
import Auth from '../utils/auth';

const AppNavbar = () => {
  const [showModal, setShowModal] = useState(false);

  const renderAuthenticatedNavLinks = () => (
    <>
      <Nav.Link as={Link} to='/saved'>
        See Your Books
      </Nav.Link>
      <Nav.Link onClick={Auth.logout}>Logout</Nav.Link>
    </>
  );

  const renderUnauthenticatedNavLinks = () => (
    <Nav.Link onClick={() => setShowModal(true)}>Login/Sign Up</Nav.Link>
  );

  const closeModal = () => setShowModal(false);

  return (
    <>
      <Navbar bg='dark' variant='dark' expand='lg'>
        <Container fluid>
          <Navbar.Brand as={Link} to='/'>
            Google Books Search
          </Navbar.Brand>
          <Navbar.Toggle aria-controls='navbar' />
          <Navbar.Collapse id='navbar'>
            <Nav className='ml-auto'>
              <Nav.Link as={Link} to='/'>
                Search For Books
              </Nav.Link>
              {Auth.loggedIn() ? renderAuthenticatedNavLinks() : renderUnauthenticatedNavLinks()}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Modal size='lg' show={showModal} onHide={closeModal} aria-labelledby='signup-modal'>
        <Tab.Container defaultActiveKey='login'>
          <Modal.Header closeButton>
            <Modal.Title id='signup-modal'>
              <Nav variant='pills'>
                <Nav.Item>
                  <Nav.Link eventKey='login'>Login</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey='signup'>Sign Up</Nav.Link>
                </Nav.Item>
              </Nav>
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Tab.Content>
              <Tab.Pane eventKey='login'>
                <LoginForm handleModalClose={closeModal} />
              </Tab.Pane>
              <Tab.Pane eventKey='signup'>
                <SignUpForm handleModalClose={closeModal} />
              </Tab.Pane>
            </Tab.Content>
          </Modal.Body>
        </Tab.Container>
      </Modal>
    </>
  );
};

export default AppNavbar;
