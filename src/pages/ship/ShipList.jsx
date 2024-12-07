import { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import UserDetails from "../../components/UserDetails";
import { fetchShips, deleteShip, updateShip } from "../../service/shipService";
import CreateShip from './CreateShip'
import { fetchOwners } from "../../service/ownerService";

function ShipList(){
  const [ships, setShips] = useState([]);
  const [owners, setOwners] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedShip, setSelectedShip] = useState({
    ship_id: '',
    ship_name: '',
    ship_type: '', 
    designspec: '', 
    owner_id: '', 
    imo_no: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [shipToDelete, setShipToDelete] = useState(null);
 
 
  const getShips = async () => {
    try {
      const shipData = await fetchShips();
      console.log("Fetched ship data", shipData)
      setShips(shipData);
    } catch (error) {
      console.error("Error fetching ships", error);
      
    }
  }

  const getOwners = async () => {
    try {
      const ownerData = await fetchOwners();
      setOwners(ownerData);
    } catch (error) {
      console.error("Error fetching owners", error);
    }
  };

  const OwnerNames = () => {
    return ships.map(ship => {
      const owner = owners.find(o => o.owner_id === ship.owner_id);
      return {
        ...ship,
        owner_name: owner ? owner.owner_name : "Unknown" // Add owner_name or "Unknown"
      };
    });
  };


  useEffect(() => {
    getShips();
    getOwners();
  },[])

  const handleShipCreated = (newShip) => {
    setShips((prevShips) => [...prevShips, newShip]);
  };

  const handleClose = () => setShowModal(false);

  const handleShow = (ship) => {
    setSelectedShip(ship);
    setShowModal(true);
  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedShip(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  const handleSave = async () => {
    console.log("Save button clicked");
    try {
      await updateShip(selectedShip.ship_id, selectedShip);
      // update user list after edit user
      getShips();
      handleClose();
    } catch (error) {
      console.error("Error updating ship", error);
    }
  }

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDelete = (ship) => {
    setShipToDelete(ship);
    setShowDeleteModal(true);
  }

  const confirmDelete = async () => {
    
    if(!shipToDelete) return;

    try {
      await deleteShip(shipToDelete.ship_id);
      console.log("Ship deleted successfully");

      handleCloseDelete();
      setShipToDelete(null);
      getShips();

    } catch (error) {
      console.error("Error deleting ship", error);

    }
  }

  const deleteCancel = () => {
    setShowDeleteModal(false);
    setShipToDelete(null);
  }
  
  const ShipInclOwnersName = OwnerNames();

  return(
    <div className="container mt-4">
      <UserDetails />
      <h2 className="mb-4">Ship List</h2>
      <CreateShip onShipCreated={handleShipCreated}/>
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Ship Name</th>
            <th scope="col">Ship Type</th>
            <th scope="col">Designspec</th>
            <th scope="col">Owners Name</th>
            <th scope="col">imo no</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {ShipInclOwnersName.map((ship) => (
            <tr key={ship.ship_id}>
              <th scope="row">{ship.ship_id}</th>
              <td>{ship.ship_name}</td>
              <td>{ship.ship_type}</td>
              <td>{ship.designspec}</td>
              <td>{ship.owner_name}</td>
              <td>{ship.imo_no}</td>

              <td>
              <button type="button"  onClick={() => handleShow(ship)} className="btn btn-secondary btn-sm edit-button">Edit</button>  
              <button type="button"  onClick={() => handleDelete(ship)} className="btn btn-secondary btn-sm edit-button">Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing a ship*/}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit Ship</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formShipId">
                <Form.Label>ID</Form.Label>
                <Form.Control 
                  type="text" 
                  name="ship_id" 
                  value={selectedShip.ship_id} 
                  readOnly 
                />
              </Form.Group>

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
                <Form.Group controlId="formOwnerId">
                
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


        {/* Modal for confirm deleting a user*/}
        <Modal show={showDeleteModal} onHide={deleteCancel}>
          <Modal.Header closeButton>
            <Modal.Title>Delete User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {shipToDelete ? (
              <>
                <p>Are you sure you want to delete the following ship?</p>
                <ul>
                  <li><strong>ID:</strong> {shipToDelete.ship_id}</li>
                  <li><strong>Name:</strong> {shipToDelete.ship_name}</li>
                  <li><strong>Ship Type:</strong> {shipToDelete.ship_type}</li>
                  <li><strong>Designspec:</strong> {shipToDelete.designspec}</li>
                  <li><strong>Owner Id:</strong> {shipToDelete.owner_id}</li>
                  <li><strong>Imo No:</strong> {shipToDelete.imo_no}</li>
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
  )

}

export default ShipList;