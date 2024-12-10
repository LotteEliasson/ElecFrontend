import { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import UserDetails from "../../components/UserDetails";
import { fetchComponents, deleteComponent, updateComponent } from "../../service/componentService";
import CreateComponent from './CreateComponent';

function ComponentList() {
  const [components, setComponents] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState({
    component_id: '',
    component_name: '',
    component_description: '',
    item_id: '',
    component_type: '',
    pos_no: '',
    maker: '',
    ref_id_name: '',
    quantity: '',
    engine_id: '',
    junction_box_id: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [componentToDelete, setComponentToDelete] = useState(null);

  const getComponents = async () => {
    try {
      const componentData = await fetchComponents();
      console.log("Fetched component data", componentData);
      setComponents(componentData);
    } catch (error) {
      console.error("Error fetching components", error);
    }
  };

  useEffect(() => {
    getComponents();
  }, []);

  const handleComponentCreated = (newComponent) => {
    setComponents((prevComponents) => [...prevComponents, newComponent]);
  };

  const handleClose = () => setShowModal(false);

  const handleShow = (component) => {
    setSelectedComponent(component);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedComponent(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    console.log("Save button clicked");
    try {
      await updateComponent(selectedComponent.component_id, selectedComponent);
      getComponents();
      handleClose();
    } catch (error) {
      console.error("Error updating component", error);
    }
  };

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDelete = (component) => {
    setComponentToDelete(component);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!componentToDelete) return;

    try {
      await deleteComponent(componentToDelete.component_id);
      console.log("Component deleted successfully");
      handleCloseDelete();
      setComponentToDelete(null);
      getComponents();
    } catch (error) {
      console.error("Error deleting component", error);
    }
  };

  const deleteCancel = () => {
    setShowDeleteModal(false);
    setComponentToDelete(null);
  };

  return (
    <div className="container mt-4">
      <UserDetails />
      <h2 className="mb-4">Component List</h2>
      <CreateComponent onComponentCreated={handleComponentCreated} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Name</th>
            <th scope="col">Description</th>
            <th scope="col">Item ID</th>
            <th scope="col">Type</th>
            <th scope="col">Position</th>
            <th scope="col">Maker</th>
            <th scope="col">Quantity</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {components.map((component) => (
            <tr key={component.component_id}>
              <th scope="row">{component.component_id}</th>
              <td>{component.component_name}</td>
              <td>{component.component_description}</td>
              <td>{component.item_id}</td>
              <td>{component.component_type}</td>
              <td>{component.pos_no}</td>
              <td>{component.maker}</td>
              <td>{component.quantity}</td>
              <td>
                <button type="button" onClick={() => handleShow(component)} className="btn btn-secondary btn-sm edit-button">Edit</button>
                <button type="button" onClick={() => handleDelete(component)} className="btn btn-secondary btn-sm edit-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing a component */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formComponentId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="component_id"
                value={selectedComponent.component_id}
                readOnly
              />
            </Form.Group>
            <Form.Group controlId="formComponentName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                name="component_name"
                value={selectedComponent.component_name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formComponentDescription">
              <Form.Label>Description</Form.Label>
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
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="component_type"
                value={selectedComponent.component_type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formPosNo">
              <Form.Label>Position</Form.Label>
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
            <Form.Group controlId="formQuantity">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="text"
                name="quantity"
                value={selectedComponent.quantity}
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

      {/* Modal for confirming delete */}
      <Modal show={showDeleteModal} onHide={deleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Component</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {componentToDelete ? (
            <>
              <p>Are you sure you want to delete the following component?</p>
              <ul>
                <li><strong>ID:</strong> {componentToDelete.component_id}</li>
                <li><strong>Name:</strong> {componentToDelete.component_name}</li>
                <li><strong>Description:</strong> {componentToDelete.component_description}</li>
              </ul>
            </>
          ) : (
            <p>Loading...</p>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={deleteCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={confirmDelete}>
            Delete
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ComponentList;
