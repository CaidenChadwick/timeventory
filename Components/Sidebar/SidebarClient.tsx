'use client'

import { useState } from "react";
import { MouseEvent } from "react";
import { logoutAction } from "./actions";
import { Offcanvas, Nav } from "react-bootstrap";


interface SidebarClientProps {
    user: string | null;
    showSidebar: boolean;
    setShowSidebar: (show: boolean) => void;
}

export default function SidebarClient({ user, showSidebar, setShowSidebar }: SidebarClientProps) {

    const [errorMessage, setErrorMessage] = useState<string>("");

    const toggleSidebar = () => setShowSidebar(!showSidebar);

    // Handle Logout click
    const handleLogOut = async (event: MouseEvent<HTMLButtonElement>) => {
        event.preventDefault();
        const message = await logoutAction();
        setErrorMessage(message);

    }

    return (
        <Offcanvas show={showSidebar} onHide={toggleSidebar} placement="end">
            <Offcanvas.Header closeButton>
                <Offcanvas.Title>{user}</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
                <Nav className="flex-column">
                    <Nav.Link href={`/user/${user}`}>Your Profile</Nav.Link>
                    <Nav.Link href={`#`}>Your Organizations</Nav.Link>
                    <Nav.Link onClick={handleLogOut}>Log Out</Nav.Link>
                </Nav>
            </Offcanvas.Body>
        </Offcanvas>
    )
};