import { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import UserDetails from "../../components/UserDetails";
import { fetchJunctionBoxes, deleteJunctionBox, updateJunctionBox } from "../../service/junctionBoxService";
import CreateJunctionBox from './CreateJunctionBox';

function JunctionBoxList() {
  const [junctionBoxes, setJunctionBoxes] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedJunctionBox, setSelectedJunctionBox] = useState({
    junction_box_id: '',
    item_id: '',
    junction_box_type: '',
    junction_box_description: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [junctionBoxToDelete, setJunctionBoxToDelete] = useState(null);

  const getJunctionBoxes = async () => {
    try {
      const junctionBoxData = await fetchJunctionBoxes();
      console.log("Fetched junction box data", junctionBoxData);
      setJunctionBoxes(junctionBoxData);
    } catch (error) {
      console.error("Error fetching junction boxes", error);
    }
  };

  useEffect(() => {
    getJunctionBoxes();
  }, []);

  const handleJunctionBoxCreated = (newJunctionBox) => {
    setJunctionBoxes((prevJunctionBoxes) => [...prevJunctionBoxes, newJunctionBox]);
  };

  const handleClose = () => setShowModal(false);

  const handleShow = (junctionBox) => {
    setSelectedJunctionBox(junctionBox);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedJunctionBox(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateJunctionBox(selectedJunctionBox.junction_box_id, selectedJunctionBox);
      getJunctionBoxes();
      handleClose();
    } catch (error) {
      console.error("Error updating junction box", error);
    }
  };

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDelete = (junctionBox) => {
    setJunctionBoxToDelete(junctionBox);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!junctionBoxToDelete) return;

    try {
      await deleteJunctionBox(junctionBoxToDelete.junction_box_id);
      console.log("Junction box deleted successfully");
      handleCloseDelete();
      setJunctionBoxToDelete(null);
      getJunctionBoxes();
    } catch (error) {
      console.error("Error deleting junction box", error);
    }
  };

  const deleteCancel = () => {
    setShowDeleteModal(false);
    setJunctionBoxToDelete(null);
  };

  return (
    <div className="container mt-4">
      <UserDetails />
      <h2 className="mb-4">Junction Box List</h2>
      <CreateJunctionBox onJunctionBoxCreated={handleJunctionBoxCreated} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Item ID</th>
            <th scope="col">Type</th>
            <th scope="col">Description</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {junctionBoxes.map((junctionBox) => (
            <tr key={junctionBox.junction_box_id}>
              <th scope="row">{junctionBox.junction_box_id}</th>
              <td>{junctionBox.item_id}</td>
              <td>{junctionBox.junction_box_type}</td>
              <td>{junctionBox.junction_box_description}</td>
              <td>
                <button type="button" onClick={() => handleShow(junctionBox)} className="btn btn-secondary btn-sm edit-button">Edit</button>
                <button type="button" onClick={() => handleDelete(junctionBox)} className="btn btn-secondary btn-sm edit-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing a junction box */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Junction Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formJunctionBoxId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="junction_box_id"
                value={selectedJunctionBox.junction_box_id}
                readOnly
              />
            </Form.Group>
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
              <Form.Label>Type</Form.Label>
              <Form.Control
                type="text"
                name="junction_box_type"
                value={selectedJunctionBox.junction_box_type}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group controlId="formJunctionBoxDescription">
              <Form.Label>Description</Form.Label>
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
          <Modal.Title>Delete Junction Box</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {junctionBoxToDelete ? (
            <>
              <p>Are you sure you want to delete the following junction box?</p>
              <ul>
                <li><strong>ID:</strong> {junctionBoxToDelete.junction_box_id}</li>
                <li><strong>Item ID:</strong> {junctionBoxToDelete.item_id}</li>
                <li><strong>Type:</strong> {junctionBoxToDelete.junction_box_type}</li>
                <li><strong>Description:</strong> {junctionBoxToDelete.junction_box_description}</li>
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

export default JunctionBoxList;
