// This local component contains the login form rendered on the client side.

'use client'

import { useState, FormEvent } from 'react';
import { loginAction } from './actions';
import { LoginData } from '@/types/formInputTypes';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default function LoginForm() {

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
    }

    return (
        <Form noValidate validated={false} onSubmit={handleSumbit}>
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
            <Button variant="primary" type="submit">Submit</Button>
        </Form>
    )
}