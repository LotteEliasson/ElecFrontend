import { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { createEngine } from '../../service/engineService';
import { fetchShips } from '../../service/shipService';

function CreateEngine({ onEngineCreated }) {

  const [ships, setShips] = useState([]);
  const [selectedEngine, setSelectedEngine] = useState({
    engine_type: '',
    engine_cylinders: '',
    engine_no: '',
    internal_engine_id: '',
    ship_id: ''
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getShips = async () => {
    try {
      const shipData = await fetchShips();
      console.log("Fetched ship data", shipData);
      setShips(shipData);
    } catch (error) {
      console.error("Error fetching ships", error);
    }
  };

  useEffect(() => {
    getShips();
  }, []);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEngine((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    try {
      const newEngine = await createEngine(selectedEngine);
      setSuccess('Engine successfully created!');
      setSelectedEngine({
        engine_type: '',
        engine_cylinders: '',
        engine_no: '',
        internal_engine_id: '',
        ship_id: ''
      });

      if (onEngineCreated) {
        onEngineCreated(newEngine);
      }

      handleClose();
    } catch (error) {
      console.error('Error creating engine:', error);
      setError('Error creating engine.');
    }
  };

  return (
    <div>
      <Button onClick={handleShow} variant="primary">
        Add Engine to Database
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Engine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group controlId="formEngineType">
              <Form.Label>Engine Type</Form.Label>
              <Form.Control
                type="text"
                name="engine_type"
                value={selectedEngine.engine_type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEngineCylinders">
              <Form.Label>Engine Cylinders</Form.Label>
              <Form.Control
                type="text"
                name="engine_cylinders"
                value={selectedEngine.engine_cylinders}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formEngineNo">
              <Form.Label>Engine No</Form.Label>
              <Form.Control
                type="text"
                name="engine_no"
                value={selectedEngine.engine_no}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formInternalEngineId">
              <Form.Label>Internal Engine ID</Form.Label>
              <Form.Control
                type="text"
                name="internal_engine_id"
                value={selectedEngine.internal_engine_id}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formShipId">
              <Form.Label>Ship</Form.Label>
              <Form.Control
                as="select"
                name="ship_id"
                value={selectedEngine.ship_id}
                onChange={handleChange}
              >
                <option value="">Select a ship</option>
                {ships.map((ship) => (
                  <option key={ship.ship_id} value={ship.ship_id}>
                    {ship.ship_name}
                  </option>
                ))}
              </Form.Control>
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

export default CreateEngine;
