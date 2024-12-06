import { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import UserDetails from "../../components/UserDetails";
import { fetchOwners, deleteOwner, updateOwner } from "../../service/ownerService";
import CreateOwner from './CreateOwner';

function OwnerList() {
  const [owners, setOwners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedOwner, setSelectedOwner] = useState({
    owner_id: '',
    owner_name: '',
    owner_email: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [ownerToDelete, setOwnerToDelete] = useState(null);

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
  }, []);

  const handleOwnerCreated = (newOwner) => {
    setOwners((prevOwners) => [...prevOwners, newOwner]);
  };

  const handleClose = () => setShowModal(false);

  const handleShow = (owner) => {
    setSelectedOwner(owner);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedOwner(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateOwner(selectedOwner.owner_id, selectedOwner);
      getOwners();
      handleClose();
    } catch (error) {
      console.error("Error updating owner", error);
    }
  };

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDelete = (owner) => {
    setOwnerToDelete(owner);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!ownerToDelete) return;

    try {
      await deleteOwner(ownerToDelete.owner_id);
      console.log("Owner deleted successfully");

      handleCloseDelete();
      setOwnerToDelete(null);
      getOwners();
    } catch (error) {
      console.error("Error deleting owner", error);
    }
  };

  const deleteCancel = () => {
    setShowDeleteModal(false);
    setOwnerToDelete(null);
  };

  return (
    <div className="container mt-4">
      <UserDetails />
      <h2 className="mb-4">Owner List</h2>
      <CreateOwner onOwnerCreated={handleOwnerCreated} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Owner Name</th>
            <th scope="col">Owner Email</th>
          </tr>
        </thead>
        <tbody>
          {owners.map((owner) => (
            <tr key={owner.owner_id}>
              <th scope="row">{owner.owner_id}</th>
              <td>{owner.owner_name}</td>
              <td>{owner.owner_email}</td>
              <td>
                <button type="button" onClick={() => handleShow(owner)} className="btn btn-secondary btn-sm edit-button">Edit</button>
                <button type="button" onClick={() => handleDelete(owner)} className="btn btn-secondary btn-sm edit-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing an owner */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formOwnerId">
              <Form.Label>ID</Form.Label>
              <Form.Control
                type="text"
                name="owner_id"
                value={selectedOwner.owner_id}
                readOnly
              />
            </Form.Group>

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

      {/* Modal for confirm deleting an owner */}
      <Modal show={showDeleteModal} onHide={deleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Owner</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ownerToDelete ? (
            <>
              <p>Are you sure you want to delete the following owner?</p>
              <ul>
                <li><strong>ID:</strong> {ownerToDelete.owner_id}</li>
                <li><strong>Name:</strong> {ownerToDelete.owner_name}</li>
                <li><strong>Email:</strong> {ownerToDelete.owner_email}</li>
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

export default OwnerList;
