import { useState, useEffect } from "react";
import { Modal, Button, Form } from 'react-bootstrap';
import { fetchEngines, deleteEngine, updateEngine } from "../../service/engineService";
import { fetchShips } from "../../service/shipService";
import CreateEngine from "./CreateEngine";


function EngineList() {
  const [engines, setEngines] = useState([]);
  const [ships, setShips] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedEngine, setSelectedEngine] = useState({
    engine_id: '',
    engine_type: '',
    engine_cylinders: '',
    engine_no: '',
    internal_engine_id: '',
    ship_id: ''
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [engineToDelete, setEngineToDelete] = useState(null);

  const getEngines = async () => {
    try {
      const engineData = await fetchEngines();
      setEngines(engineData);
    } catch (error) {
      console.error("Error fetching engines", error);
    }
  };

  const getShips = async () => {
    try {
      const shipData = await fetchShips();
      setShips(shipData);
    } catch (error) {
      console.error("Error fetching ships", error);
    }
  };

  const ShipNames = () => {
    return engines.map(engine => {
      const ship = ships.find(s => s.ship_id === engine.ship_id);
      return {
        ...engine,
        ship_name: ship ? ship.ship_name : "Unknown"
      };
    });
  };

  useEffect(() => {
    getEngines();
    getShips();
  }, []);

  const handleEngineCreated = (newEngine) => {
    setEngines((prevEngines) => [...prevEngines, newEngine]);
  };

  const handleClose = () => setShowModal(false);

  const handleShow = (engine) => {
    setSelectedEngine(engine);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedEngine(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleSave = async () => {
    try {
      await updateEngine(selectedEngine.engine_id, selectedEngine);
      getEngines();
      handleClose();
    } catch (error) {
      console.error("Error updating engine", error);
    }
  };

  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDelete = (engine) => {
    setEngineToDelete(engine);
    setShowDeleteModal(true);
  };

  const confirmDelete = async () => {
    if (!engineToDelete) return;

    try {
      await deleteEngine(engineToDelete.engine_id);
      console.log("Engine deleted successfully");

      handleCloseDelete();
      setEngineToDelete(null);
      getEngines();
    } catch (error) {
      console.error("Error deleting engine", error);
    }
  };

  const deleteCancel = () => {
    setShowDeleteModal(false);
    setEngineToDelete(null);
  };

  const enginesInclShipNames = ShipNames();

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Engine List</h2>
      <CreateEngine onEngineCreated={handleEngineCreated} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Type</th>
            <th scope="col">Cylinders</th>
            <th scope="col">Engine No</th>
            <th scope="col">Internal Engine ID</th>
            <th scope="col">Ship</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {enginesInclShipNames.map((engine) => (
            <tr key={engine.engine_id}>
              <th scope="row">{engine.engine_id}</th>
              <td>{engine.engine_type}</td>
              <td>{engine.engine_cylinders}</td>
              <td>{engine.engine_no}</td>
              <td>{engine.internal_engine_id}</td>
              <td>{engine.ship_name}</td>
              <td>
                <button
                  type="button"
                  onClick={() => handleShow(engine)}
                  className="btn btn-secondary btn-sm edit-button"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(engine)}
                  className="btn btn-secondary btn-sm edit-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing an engine */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Engine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Engine Type</Form.Label>
              <Form.Control
                type="text"
                name="engine_type"
                value={selectedEngine.engine_type}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Engine Cylinders</Form.Label>
              <Form.Control
                type="text"
                name="engine_cylinders"
                value={selectedEngine.engine_cylinders}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Engine No</Form.Label>
              <Form.Control
                type="text"
                name="engine_no"
                value={selectedEngine.engine_no}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Internal Engine ID</Form.Label>
              <Form.Control
                type="text"
                name="internal_engine_id"
                value={selectedEngine.internal_engine_id}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group>
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

      {/* Modal for confirming deletion */}
      <Modal show={showDeleteModal} onHide={deleteCancel}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Engine</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {engineToDelete ? (
            <>
              <p>Are you sure you want to delete the following engine?</p>
              <ul>
                <li><strong>ID:</strong> {engineToDelete.engine_id}</li>
                <li><strong>Type:</strong> {engineToDelete.engine_type}</li>
                <li><strong>Cylinders:</strong> {engineToDelete.engine_cylinders}</li>
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

export default EngineList;
