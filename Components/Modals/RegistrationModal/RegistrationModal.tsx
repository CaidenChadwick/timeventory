import React, { FormEvent, useState } from 'react';
import { useInputValidation } from '@/utils/hooks';
import validate from '@/validation/client-validation';
import { RegistrationData } from '@/types/formInputTypes';
import { RegistrationValidationSchema } from '@/validation/validationSchema';
import { registerUserAction } from './actions';
import Modal from 'react-bootstrap/Modal';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Alert from 'react-bootstrap/Alert';

export default function RegistrationModal({ showRegisterModal, toggleRegisterModal }: { showRegisterModal: boolean, toggleRegisterModal: () => void }) {

    const { emailSchema, usernameSchema, passwordSchema } = RegistrationValidationSchema;

    const [errorMessage, setErrorMessage] = useState<string>("");
    const [emailState, setEmailState] = useInputValidation("");
    const [usernameState, setUsernameState] = useInputValidation("");
    const [passwordState, setPasswordState] = useInputValidation("");

    // Handle the form submission
    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        validate(emailSchema, emailState.value);
        validate(usernameSchema, usernameState.value);
        validate(passwordSchema, passwordState.value);

        if (!emailState.valid || !usernameState.valid || !passwordState.valid) {
            return;
        }

        const registrationData: RegistrationData = {
            email: emailState.value,
            username: usernameState.value,
            password: passwordState.value
        };

        const message = await registerUserAction(registrationData);
        setErrorMessage(message);
        if (!message) {
            toggleRegisterModal();
        }
    }

    return (
        <Modal show={showRegisterModal} onHide={toggleRegisterModal} animation={false}>
            <Modal.Header closeButton>
                <Modal.Title>Register</Modal.Title>
            </Modal.Header>
            <Form noValidate validated={false} onSubmit={handleSubmit}>
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Email</b></Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Email"
                            isInvalid={!emailState.valid}
                            onChange={(e) => setEmailState({valid: true, errorMsg: "", value: e.target.value})}
                            onBlur={(e) => setEmailState(validate(emailSchema, e.target.value))}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {emailState.errorMsg}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Username</b></Form.Label>
                        <Form.Control
                            placeholder="Username"
                            isInvalid={!usernameState.valid}
                            onChange={(e) => setUsernameState({valid: true, errorMsg: "", value: e.target.value})}
                            onBlur={(e) => setUsernameState(validate(usernameSchema, e.target.value))}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {usernameState.errorMsg}
                        </Form.Control.Feedback>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label><b>Password</b></Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Password"
                            isInvalid={!passwordState.valid}
                            onChange={(e) => setPasswordState({valid: true, errorMsg: "", value: e.target.value})}
                            onBlur={(e) => setPasswordState(validate(passwordSchema, e.target.value))}
                            required
                        />
                        <Form.Control.Feedback type="invalid">
                            {passwordState.errorMsg}
                        </Form.Control.Feedback>
                        {errorMessage &&
                            <Alert variant="danger" onClose={() => setErrorMessage("")} dismissible>
                                {errorMessage}
                            </Alert>
                        }
                    </Form.Group>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="primary" type="submit">Submit</Button>
                </Modal.Footer>
            </Form>
        </Modal>
    )
}