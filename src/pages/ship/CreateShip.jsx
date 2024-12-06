import { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { createShip } from '../../service/shipService';
import { fetchOwners } from '../../service/ownerService';

function CreateShip({ onShipCreated }) {

  const [owners, setOwners] = useState([]);
  const [selectedShip, setSelectedShip] = useState({
    ship_name: '',
    ship_type: '', 
    designspec: '', 
    owner_id: '', 
    imo_no: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getOwners = async () => {
    try {
      const ownerData = await fetchOwners();
      console.log("Fetched owner data", ownerData);
      setOwners(ownerData);
    } catch (error) {
      console.error("Error fetching owners", error);
    }
  };

  useEffect(() => {
    getOwners();
  },[])

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedShip((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    try {
      const newShip = await createShip(selectedShip);
      setSuccess('Ship successfully created!');
      setSelectedShip({
        ship_name: '',
        ship_type: '', 
        designspec: '', 
        owner_id: '', 
        imo_no: ''
      });
      
      if (onShipCreated) {
        onShipCreated(newShip);
      }

      handleClose();
    } catch (error) {
      console.error('Error creating ship:', error);
      setError('Error creating ship.');
    }
  };

  return (
    <div>
      <Button onClick={handleShow} variant="primary">
        Add Ship
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Ship</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group controlId="formShipName">
              <Form.Label>Ship Name</Form.Label>
              <Form.Control 
                type="text" 
                name="ship_name" 
                value={selectedShip.ship_name} 
                onChange={handleChange} 
              />
            </Form.Group>
            <Form.Group controlId="formShipType">
              <Form.Label>Ship Type</Form.Label>
              <Form.Control 
                type="text" 
                name="ship_type" 
                value={selectedShip.ship_type} 
                onChange={handleChange} 
              />
            </Form.Group>
            
            <Form.Group controlId="formDesignspec">
                <Form.Label>Designspec</Form.Label>
                <Form.Control 
                  type="text" 
                  name="designspec" 
                  value={selectedShip.designspec} 
                  onChange={handleChange} 
                />
                </Form.Group>

                <Form.Group>
                <Form.Label>Owner</Form.Label>
                  <Form.Control
                    as="select"
                    name="owner_id"
                    value={selectedShip.owner_id}
                    onChange={handleChange}
                  >
                    <option value="">Select an owner</option>
                    {owners.map((owner) => (
                      <option key={owner.owner_id} value={owner.owner_id}>
                        {owner.owner_name}
                      </option>
                    ))}
                  </Form.Control>
                </Form.Group>

                <Form.Group controlId="formImoNo">
                <Form.Label>Imo No</Form.Label>
                <Form.Control 
                  type="text" 
                  name="imo_no" 
                  value={selectedShip.imo_no} 
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

export default CreateShip;
