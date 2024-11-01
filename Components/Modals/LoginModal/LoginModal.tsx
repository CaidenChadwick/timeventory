import { loginAction } from './actions';
import { useState } from 'react';
import { FormEvent } from 'react';
import { LoginData } from '@/types/formInputTypes';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginModal({ showLoginModal, toggleLoginModal }: { showLoginModal: boolean, toggleLoginModal: () => void }) {
    const [usernameState, setUsernameState] = useState<string>('');
    const [passwordState, setPasswordState] = useState<string>('');
    const [error, setError] = useState(false);

    // Handle the form submission
    const handleSumbit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const loginData: LoginData = {
            username: usernameState,
            password: passwordState
        };

        setError(!(await loginAction(loginData)));

        if (!error) {
            toggleLoginModal();
        }
    }

    const handleModalOpen = () => {
        setError(false);
    }

    return (
        <Modal show={showLoginModal} onShow={handleModalOpen} onHide={toggleLoginModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Login</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={false} onSubmit={handleSumbit}>
                <Modal.Body>

                    <Form.Group className="mb-3">
                        <Form.Label><b>Username</b></Form.Label>
                        <Form.Control
                            placeholder="Username"
                            required
                            isInvalid={error}
                            onChange={(e) => setUsernameState(e.target.value)}
                        />
                        <Form.Control.Feedback type="invalid">
                            Incorrect Username and/or Password.
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            isInvalid={error}
                            required
                            onChange={(e) => setPasswordState((e.target.value))}
                        />
                        <Form.Control.Feedback type="invalid">
                            Incorrect Username and/or Password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}