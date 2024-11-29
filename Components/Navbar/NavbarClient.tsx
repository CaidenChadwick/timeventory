'use client'
import React from 'react';
import { useState } from 'react';
import { MouseEvent } from 'react';
import Image from 'next/image';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';

import LoginModal from '../Modals/LoginModal/LoginModal';
import RegistrationModal from '../Modals/RegistrationModal/RegistrationModal';
import SidebarClient from '../Sidebar/SidebarClient';


interface NavbarClientProps {
  loggedIn: boolean;
  user: string | null;
}

export default function NavbarClient({ loggedIn, user }: NavbarClientProps) {

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [showSidebar, setShowSidebar] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  }

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={128}
            height={128}
          />
        </Navbar.Brand>
        {loggedIn &&
          <Navbar.Brand href="/user">
            User
          </Navbar.Brand>}

      </Container>
      <LoginModal
        showLoginModal={showLoginModal}
        toggleLoginModal={toggleLoginModal}
      />
      <RegistrationModal
        showRegisterModal={showRegisterModal}
        toggleRegisterModal={toggleRegisterModal}
      />
      <Navbar.Toggle />
      <Navbar.Collapse className="justify-content-end">
        {!loggedIn &&
          <Nav>
            <Nav.Link onClick={toggleLoginModal}>Log In</Nav.Link>
            <Nav.Link onClick={toggleRegisterModal}>Register</Nav.Link>
          </Nav>
        }

        {loggedIn &&
          <Nav>
            <Nav.Link
              onClick={() => setShowSidebar(true)} // Toggle the sidebar on click
              style={{ cursor: 'pointer', color: 'white' }}
            >
              Open Sidebar
            </Nav.Link>
          </Nav>
        }
      </Navbar.Collapse>
      {loggedIn &&
        <SidebarClient user={user} showSidebar={showSidebar} setShowSidebar={setShowSidebar} />
      }
    </Navbar>
  )
};