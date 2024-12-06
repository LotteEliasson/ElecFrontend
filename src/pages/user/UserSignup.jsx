// components/Signup.js

import { useState } from 'react';
import Navigo from 'navigo';
import { createUser } from '../../service/userService';
import { Form, Button, Alert } from 'react-bootstrap';


const router = new Navigo('/', { hash: true });

function UserSignup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    company: '',
    userrole: 'user', // Standart role 
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    
    const { username, email, password, company, userrole } = formData;
    if (!username || !email || !password || !company || !userrole) {
      setError('All fields should be filled.');
      return;
    }

    try {
      const newUser = await createUser(formData);
      setSuccess('User successfully created!');
      setFormData({
        username: '',
        email: '',
        password: '',
        company: '',
        userrole: 'user',
      });

      // Navigate to login after success sign up
      router.navigate('/login');
    } catch (err) {
      if (err.response && err.response.data && err.response.data.message) {
        setError(err.response.data.message);
      } else {
        setError('Error trying to create new user.');
      }
    }
  };

  return (
    <div className="container mt-4">
      <h2>Sign Up</h2>
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">{success}</Alert>}
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="formUsername" className="mb-3">
          <Form.Label>Username</Form.Label>
          <Form.Control 
            type="text" 
            name="username" 
            value={formData.username} 
            onChange={handleChange} 
            placeholder="Indtast brugernavn" 
          />
        </Form.Group>

        <Form.Group controlId="formEmail" className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control 
            type="email" 
            name="email" 
            value={formData.email} 
            onChange={handleChange} 
            placeholder="Indtast email" 
          />
        </Form.Group>

        <Form.Group controlId="formPassword" className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control 
            type="password" 
            name="password" 
            value={formData.password} 
            onChange={handleChange} 
            placeholder="Indtast password" 
          />
        </Form.Group>

        <Form.Group controlId="formCompany" className="mb-3">
          <Form.Label>Company</Form.Label>
          <Form.Control 
            type="text" 
            name="company" 
            value={formData.company} 
            onChange={handleChange} 
            placeholder="Indtast firma" 
          />
        </Form.Group>

        

        <Button variant="primary" type="submit">
          Apply
        </Button>
      </Form>
    </div>
  );
}

export default UserSignup;
