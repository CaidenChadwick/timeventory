'use client';

import LoginForm from '@/Components/Forms/Login/LoginForm';
import Card from 'react-bootstrap/Card';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function BodyOnlyExample() {
  return (
    <Container className="mt-5">
      <Row className="justify-content-md-center" md="6">
        <Col md="6">
          <Card>
            <Card.Body>
              <Card.Title><b>Log In</b></Card.Title>
              <LoginForm />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default BodyOnlyExample;