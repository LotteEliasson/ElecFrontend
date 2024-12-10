import { useState, useEffect } from 'react';
import { Form, Button, Modal, Alert } from 'react-bootstrap';
import { createComponent } from '../../service/componentService';
import { fetchEngines } from '../../service/engineService';
import { fetchJunctionBoxes } from '../../service/junctionBoxService';

function CreateComponent({ onComponentCreated }) {

  const [engines, setEngines] = useState([]);
  const [junctionBoxes, setJunctionBoxes] = useState([]);
  const [selectedComponent, setSelectedComponent] = useState({
    component_name: '',
    component_description: '',
    item_id: '',
    component_type: '',
    pos_no: '',
    maker: '',
    ref_id_name: '',
    quantity: '',
    engine_id: '',
    junction_box_id: '',
  });
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  const getRelatedData = async () => {
    try {
      const engineData = await fetchEngines();
      const junctionBoxData = await fetchJunctionBoxes();
      setEngines(engineData);
      setJunctionBoxes(junctionBoxData);
    } catch (error) {
      console.error("Error fetching related data", error);
    }
  };

  useEffect(() => {
    getRelatedData();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedComponent((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');
    try {
      const newComponent = await createComponent(selectedComponent);
      setSuccess('Component successfully created!');
      setSelectedComponent({
        component_name: '',
        component_description: '',
        item_id: '',
        component_type: '',
        pos_no: '',
        maker: '',
        ref_id_name: '',
        quantity: '',
        engine_id: '',
        junction_box_id: '',
      });

      if (onComponentCreated) {
        onComponentCreated(newComponent);
      }

      handleClose();
    } catch (error) {
      console.error('Error creating component:', error);
      setError('Error creating component.');
    }
  };

  return (
    <div>
      <Button type="button" onClick={handleShow} className="btn btn-secondary btn-sm edit-button">
        Add Component to the Database
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
            <Form.Group controlId="formComponentName">
              <Form.Label>Component Name</Form.Label>
              <Form.Control
                type="text"
                name="component_name"
                value={selectedComponent.component_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formComponentDescription">
              <Form.Label>Component Description</Form.Label>
              <Form.Control
                type="text"
                name="component_description"
                value={selectedComponent.component_description}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formItemId">
              <Form.Label>Item ID</Form.Label>
              <Form.Control
                type="text"
                name="item_id"
                value={selectedComponent.item_id}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formComponentType">
              <Form.Label>Component Type</Form.Label>
              <Form.Control
                type="text"
                name="component_type"
                value={selectedComponent.component_type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPosNo">
              <Form.Label>Position No</Form.Label>
              <Form.Control
                type="text"
                name="pos_no"
                value={selectedComponent.pos_no}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formMaker">
              <Form.Label>Maker</Form.Label>
              <Form.Control
                type="text"
                name="maker"
                value={selectedComponent.maker}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formRefIdName">
              <Form.Label>Reference ID Name</Form.Label>
              <Form.Control
                type="text"
                name="ref_id_name"
                value={selectedComponent.ref_id_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={selectedComponent.quantity}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formEngine">
              <Form.Label>Engine</Form.Label>
              <Form.Control
                as="select"
                name="engine_id"
                value={selectedComponent.engine_id}
                onChange={handleChange}
              >
                <option value="">Select an engine</option>
                {engines.map((engine) => (
                  <option key={engine.engine_id} value={engine.engine_id}>
                    {engine.engine_type}
                  </option>
                ))}
              </Form.Control>
            </Form.Group>
            <Form.Group controlId="formJunctionBox">
              <Form.Label>Junction Box</Form.Label>
              <Form.Control
                as="select"
                name="junction_box_id"
                value={selectedComponent.junction_box_id}
                onChange={handleChange}
              >
                <option value="">Select a junction box</option>
                {junctionBoxes.map((junctionBox) => (
                  <option key={junctionBox.junction_box_id} value={junctionBox.junction_box_id}>
                    {junctionBox.junction_box_type}
                  </option>
                ))}
              </Form.Control>
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

export default CreateComponent;
