import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import UserDetails from "../../components/UserDetails";
import { fetchManuals, deleteManual, createManual, updateManual, downloadManual, saveManualToFile } from "../../service/manualService";
import { fetchShips } from "../../service/shipService";
import CreateManual from "./CreateManuals";

function ManualList() {
  const [manuals, setManuals] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [selectedManual, setSelectedManual] = useState({
    manual_id: "",
    manual_name: "",
    version: "",
    manual_component: "",
    manual_junction_box: "",
    ships: "",
    file: null, // Placeholder for file upload
  });
  const [ships, setShips] = useState([])

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [manualToDelete, setManualToDelete] = useState(null);

  const getManuals = async () => {
    try {
      const manualData = await fetchManuals();
      console.log("Fetched manual data", manualData);
      setManuals(manualData);
    } catch (error) {
      console.error("Error fetching manuals", error);
    }
  };

  const getShips = async () => {
    try {
      const shipData = await fetchShips();
      console.log("Fetched ship data", shipData);
      setShips(shipData);

    } catch (error) {
      console.error("Error fetching ships", error);
    }
  }

  const shipNames = () => {
    return manuals.map(manual => {
      const matchingShip = ships.find(s => s.ship_id === manual.ships);
      return {
        ...manual,
        ship_name: matchingShip ? matchingShip.ship_name : "Unknown" // Add owner_name or "Unknown"
      };
    });
  };

  useEffect(() => {
    getManuals();
    getShips();
  }, []);

  const handleManualCreated = (newManual) => {
    setManuals((prevManuals) => [...prevManuals, newManual]);
  };

  const handleClose = () => setShowModal(false);

  const handleShow = (manual) => {
    setSelectedManual(manual);
    setShowModal(true);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setSelectedManual((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    setSelectedManual((prevState) => ({
      ...prevState,
      file,
    }));
  };

  const handleSave = async () => {
    console.log("Save button clicked");
    try {
      const formData = new FormData();
      formData.append("manual_id", selectedManual.manual_id);
      formData.append("manual_name", selectedManual.manual_name);
      formData.append("version", selectedManual.version);
      formData.append("manual_component", selectedManual.manual_component || "");
      formData.append("manual_junction_box", selectedManual.manual_junction_box || "");
      formData.append("ships", selectedManual.ships || "");
      if (selectedManual.file) {
        formData.append("file", selectedManual.file); // Include file if present
      }

      console.log("FormData Contents:");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }

      await updateManual(selectedManual.manual_id, formData);
          
      console.log("FormData before sending:");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }
        
      getManuals();
      handleClose();
    } catch (error) {
      console.error("Error updating manual", error);
    }
  };





  const handleCloseDelete = () => setShowDeleteModal(false);

  const handleDelete = (manual) => {
    setManualToDelete(manual);
    setShowDeleteModal(true);
  };



  const confirmDelete = async () => {
    if (!manualToDelete) return;

    try {
      await deleteManual(manualToDelete.manual_id);
      console.log("Manual deleted successfully");

      handleCloseDelete();
      setManualToDelete(null);
      getManuals();
    } catch (error) {
      console.error("Error deleting manual", error);
    }
  };

  const deleteCancel = () => {
    setShowDeleteModal(false);
    setManualToDelete(null);
  };

  const handleDownload = async (manual) => {
    try {
      console.log("Download button clicked for manual ID:", manual);
      const blob = await downloadManual(manual.manual_id);
      console.log("Blob received for download:", blob);
  
      // Step 2: Debug blob content using FileReader
      const reader = new FileReader();
      reader.onload = () => {
        console.log("Blob content as text:", reader.result);
      };
      reader.onerror = (error) => {
        console.error("Error reading blob content:", error);
      };
      reader.readAsText(blob); // Read the blob content as text (for debugging purposes)

      // Extract file name from headers (if provided)
      const contentDisposition = blob.headers?.['content-disposition'];
      const matches = contentDisposition?.match(/filename="(.+)"/);
      const fileName = matches ? matches[1] : manual.file_name || 'Manual.pdf';

      saveManualToFile(blob, fileName);
    } catch (error) {
      console.error("Error during download process:", error.message);
    }
  };
  
  const manualInclShipName = shipNames();

  return (
    <div className="container mt-4">
      <UserDetails />
      <h2 className="mb-4">Manual List</h2>
      <CreateManual onManualCreated={handleManualCreated} />
      <table className="table table-striped">
        <thead className="thead-dark">
          <tr>
            <th scope="col">ID</th>
            <th scope="col">Manual Name</th>
            <th scope="col">Version</th>
            <th scope="col">Component ID</th>
            <th scope="col">Junction Box ID</th>
            <th scope="col">Ship Name</th>
            <th scope="col">Manual</th>
            <th scope="col">Actions</th>
          </tr>
        </thead>
        <tbody>
          {manualInclShipName.map((manual) => (
            <tr key={manual.manual_id}>
              <th scope="row">{manual.manual_id}</th>
              <td>{manual.manual_name}</td>
              <td>{manual.version}</td>
              <td>{manual.manual_component || "N/A"}</td>
              <td>{manual.manual_junction_box || "N/A"}</td>
              <td>{manual.ship_name || "N/A"}</td>
              <td>
              {manual.file_name ? (
                 <button  type="button" 
                  onClick={() => handleDownload(manual)}
                  className="btn btn-secondary btn-sm edit-button"
                 >
                 Download Manual
               </button>
              ) : (
                "N/A"
              )}

              </td>
              <td>
                <button
                  type="button"
                  onClick={() => handleShow(manual)}
                  className="btn btn-secondary btn-sm edit-button"
                >
                  Edit
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(manual)}
                  className="btn btn-secondary btn-sm edit-button"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Modal for editing a manual */}
      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formManualId">
              <Form.Label>ID</Form.Label>
              <Form.Control type="text" name="manual_id" value={selectedManual.manual_id} readOnly />
            </Form.Group>

            <Form.Group controlId="formManualName">
              <Form.Label>Manual Name</Form.Label>
              <Form.Control
                type="text"
                name="manual_name"
                value={selectedManual.manual_name}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formVersion">
              <Form.Label>Version</Form.Label>
              <Form.Control
                type="text"
                name="version"
                value={selectedManual.version}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formManualComponent">
              <Form.Label>Component ID</Form.Label>
              <Form.Control
                type="text"
                name="manual_component"
                value={selectedManual.manual_component}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formManualJunctionBox">
              <Form.Label>Junction Box ID</Form.Label>
              <Form.Control
                type="text"
                name="manual_junction_box"
                value={selectedManual.manual_junction_box}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formShips">
              <Form.Label>Ship ID</Form.Label>
              <Form.Control
                type="text"
                name="ships"
                value={selectedManual.ships}
                onChange={handleChange}
              />
            </Form.Group>

            <Form.Group controlId="formFile">
              <Form.Label>Upload PDF</Form.Label>
              <Form.Control 
                type="file" 
                
                onChange={handleFileChange} />
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
          <Modal.Title>Delete Manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {manualToDelete ? (
            <>
              <p>Are you sure you want to delete the following manual?</p>
              <ul>
                <li>
                  <strong>ID:</strong> {manualToDelete.manual_id}
                </li>
                <li>
                  <strong>Name:</strong> {manualToDelete.manual_name}
                </li>
                <li>
                  <strong>Version:</strong> {manualToDelete.version}
                </li>
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

export default ManualList;
