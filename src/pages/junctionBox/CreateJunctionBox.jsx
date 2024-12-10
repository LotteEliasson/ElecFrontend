import { useState } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { createJunctionBox } from '../../service/junctionBoxService';

function CreateJunctionBox({ onJunctionBoxCreated }) {
  const [selectedJunctionBox, setSelectedJunctionBox] = useState({
    item_id: '',
    junction_box_type: '',
    junction_box_description: '',
  });

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedJunctionBox((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    try {
      const newJunctionBox = await createJunctionBox(selectedJunctionBox);
      setSuccess('Junction Box successfully created!');
      setSelectedJunctionBox({
        item_id: '',
        junction_box_type: '',
        junction_box_description: '',
      });

      if (onJunctionBoxCreated) {
        onJunctionBoxCreated(newJunctionBox);
      }

      handleClose();
    } catch (error) {
      console.error('Error creating junction box:', error);
      setError('Error creating junction box.');
    }
  };

  return (
    <div>
      <Button type="button" onClick={handleShow} className="btn btn-secondary btn-sm edit-button">
        Add Junction Box to the Database
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Junction Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group controlId="formItemId">
              <Form.Label>Item ID</Form.Label>
              <Form.Control
                type="text"
                name="item_id"
                value={selectedJunctionBox.item_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formJunctionBoxType">
              <Form.Label>Junction Box Type</Form.Label>
              <Form.Control
                type="text"
                name="junction_box_type"
                value={selectedJunctionBox.junction_box_type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formJunctionBoxDescription">
              <Form.Label>Junction Box Description</Form.Label>
              <Form.Control
                type="text"
                name="junction_box_description"
                value={selectedJunctionBox.junction_box_description}
                onChange={handleChange}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button type="button" onClick={handleClose} className="btn btn-secondary btn-sm edit-button">
            Close
          </Button>
          <Button type="button" onClick={handleSave} className="btn btn-primary btn-sm edit-button">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateJunctionBox;
