import React from "react"
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';

function SignIn() {
  return (
    <Form style={{width:"30%",border:"1px solid grey",borderRadius:"10%"}} className="mx-auto my-5 p-5">
      <Form.Group className="mb-3" controlId="formBasicEmail">
        <h1 className="mb-5">Sign in</h1>
        <Form.Label>Email address</Form.Label>
        <Form.Control type="email" placeholder="Enter email" />
        <Form.Text className="text-muted">
          We'll never share your email with anyone else.
        </Form.Text>
      </Form.Group>

      <Form.Group className="mb-3" controlId="formBasicPassword">
        <Form.Label>Password</Form.Label>
        <Form.Control type="password" placeholder="Password" />
      </Form.Group>
      <Form.Group className="mb-3" controlId="formBasicCheckbox">
      </Form.Group>
      <Button variant="primary mt-5" type="submit">
        Submit
      </Button>
    </Form>
  );
}

export default SignIn;

