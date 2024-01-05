import React, { useState } from 'react';
import { Form, Button, Alert } from 'react-bootstrap';

import { loginUser } from '../utils/API';
import Auth from '../utils/auth';

const LoginForm = () => {
  // Initial form data state
  const initialFormData = { email: '', password: '' };
  // State to manage form data
  const [userFormData, setUserFormData] = useState(initialFormData);
  // State to manage the visibility of the alert
  const [showAlert, setShowAlert] = useState(false);

  // Handle input changes in the form fields
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // Update form data using the functional form of setUserFormData
    setUserFormData((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  // Handle form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Validate the form using react-bootstrap's form validation
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }

    try {
      // Attempt to login user using the loginUser function
      const response = await loginUser(userFormData);

      if (!response.ok) {
        // Throw an error if something goes wrong with the login
        throw new Error('something went wrong!');
      }

      // Extract token and user data from the response
      const { token, user } = await response.json();
      console.log(user);
      // Login user using the Auth utility
      Auth.login(token);
    } catch (err) {
      // Log any errors and show the alert
      console.error(err);
      setShowAlert(true);
    }

    // Reset form data to its initial state after submission
    setUserFormData(initialFormData);
  };

  return (
    <>
      {/* Login Form */}
      <Form noValidate onSubmit={handleFormSubmit}>
        {/* Alert for displaying login errors */}
        <Alert dismissible onClose={() => setShowAlert(false)} show={showAlert} variant='danger'>
          Something went wrong with your login credentials!
        </Alert>

        {/* Email input field */}
        <Form.Group>
          <Form.Label>Email</Form.Label>
          <Form.Control
            type='text'
            placeholder='Your email'
            name='email'
            onChange={handleInputChange}
            value={userFormData.email}
            required
          />
          <Form.Control.Feedback type='invalid'>Email is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Password input field */}
        <Form.Group>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Your password'
            name='password'
            onChange={handleInputChange}
            value={userFormData.password}
            required
          />
          <Form.Control.Feedback type='invalid'>Password is required!</Form.Control.Feedback>
        </Form.Group>

        {/* Submit button */}
        <Button
          disabled={!(userFormData.email && userFormData.password)}
          type='submit'
          variant='success'>
          Submit
        </Button>
      </Form>
    </>
  );
};

export default LoginForm;
