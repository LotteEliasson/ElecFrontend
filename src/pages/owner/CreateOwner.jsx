import { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { createOwner } from '../../service/ownerService';

function CreateOwner({ onOwnerCreated }) {
  const [selectedOwner, setSelectedOwner] = useState({
    owner_name: '',
    owner_email: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOwner((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    try {
      const newOwner = await createOwner(selectedOwner);
      setSuccess('Owner successfully created!');
      setSelectedOwner({
        owner_name: '',
        owner_email: ''
      });

      if (onOwnerCreated) {
        onOwnerCreated(newOwner);
      }

      handleClose();
    } catch (error) {
      console.error('Error creating owner:', error);
      setError('Error creating owner.');
    }
  };

  return (
    <div>
      <Button onClick={handleShow} variant="secondary">
        Add Owner to Database
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group controlId="formOwnerName">
              <Form.Label>Owner Name</Form.Label>
              <Form.Control 
                type="text" 
                name="owner_name" 
                value={selectedOwner.owner_name} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group controlId="formOwnerEmail">
              <Form.Label>Owner Email</Form.Label>
              <Form.Control 
                type="email" 
                name="owner_email" 
                value={selectedOwner.owner_email} 
                onChange={handleChange} 
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateOwner;
