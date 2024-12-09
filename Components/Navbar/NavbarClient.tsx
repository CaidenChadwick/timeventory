'use client'
import React from 'react';
import { useState } from 'react';
import { MouseEvent } from 'react';
import Image from 'next/image';
import { logoutAction } from './actions';
import LoginModal from '../Modals/LoginModal/LoginModal';
import RegistrationModal from '../Modals/RegistrationModal/RegistrationModal';
import FuzzySearchClient from '../Search/FuzzySearchClient';

import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';


export default function NavbarClient({ loggedIn, user }: { loggedIn: boolean, user: string | null }) {

  const [showLoginModal, setShowLoginModal] = useState<boolean>(false);
  const [showRegisterModal, setShowRegisterModal] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");

  const toggleLoginModal = () => {
    setShowLoginModal(!showLoginModal);
  }

  const toggleRegisterModal = () => {
    setShowRegisterModal(!showRegisterModal);
  }

  // Handle Logout click
  const handleLogOut = async (event: MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    const message = await logoutAction();
    setErrorMessage(message);
  }

  return (
    <Navbar collapseOnSelect expand="lg" bg="dark" data-bs-theme="dark" className="py-0">
      <Container>
        <Navbar.Brand href="/">
          <Image
            src="/favicon.ico"
            alt="Logo"
            width={128}
            height={128}
          />
        </Navbar.Brand>
        <FuzzySearchClient />
        {loggedIn && user &&
          <Navbar.Brand href="/user" className="link">
            {user}
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
            <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
          </Nav>
        }
      </Navbar.Collapse>
    </Navbar>
  )
};