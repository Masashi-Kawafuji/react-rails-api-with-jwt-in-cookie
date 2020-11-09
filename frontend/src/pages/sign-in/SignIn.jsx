import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import instance from '../../services/instance';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export const SignIn = () => {
  const [input, setInput] = useState({
    email: '',
    password: ''
  })

  const history = useHistory();

  const handleInputChange = event => {
    const { name, value } = event.target;
    setInput(input => ({ ...input, [name]: value }));
  }

  const handleFormSubmit = event => {
    instance.post('/login', input)
      .then(response => {
        console.log(response);
        history.push('/posts');
      })
      .catch(error => {
        console.log(error);
      });
    event.preventDefault();
  }

  return (
    <Form onSubmit={handleFormSubmit}>
      <Form.Group controlId='formSignInEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          name='email'
          onChange={handleInputChange}
          type='text'
          placeholder='Enter email'
        />
      </Form.Group>
      <Form.Group controlId='formSignInPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          name='password'
          onChange={handleInputChange}
          type='password'
          placeholder='Password'
        />
      </Form.Group>
      <Button type='submit' variant='primary'>Sign In</Button>
    </Form>
  );
}