import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import instance from '../../services/instance';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';


export const SignUp = () => {
  const [input, setInput] = useState({
    name: '',
    email: '',
    password: '',
    password_confirmation: ''
  });

  const history = useHistory();

  const hanldeInputChange = event => {
    const { name, value } = event.target;
    setInput(input => ({ ...input, [name]: value }));
  }

  const handleFormSubmit = event => {
    instance.post('/users', { user: input })
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
      <Form.Group controlId='formSignInName'>
        <Form.Label>Name</Form.Label>
        <Form.Control
          type='text'
          name='name'
          onChange={hanldeInputChange}
          value={input.name}
          placeholder='Enter name'
        />
      </Form.Group>
      <Form.Group controlId='formSignInEmail'>
        <Form.Label>Email</Form.Label>
        <Form.Control
          type='email'
          name='email'
          onChange={hanldeInputChange}
          value={input.email}
          placeholder='Enter email'
        />
      </Form.Group>
      <Form.Group controlId='formSignInPassword'>
        <Form.Label>Password</Form.Label>
        <Form.Control
          type='password'
          name='password'
          onChange={hanldeInputChange}
          value={input.password}
          placeholder='Password'
        />
      </Form.Group>
      <Form.Group controlId='formSignInPasswordConfirmation'>
        <Form.Label>Password Confirmation</Form.Label>
        <Form.Control
          type='password'
          name='password_confirmation'
          onChange={hanldeInputChange}
          value={input.password_confirmation}
          placeholder='Password Confirmation'
        />
      </Form.Group>
      <Button variant='primary' type='submit'>Sign Up</Button>
    </Form>
  );
}