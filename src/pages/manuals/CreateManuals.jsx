import { useState } from "react";
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { createManual } from '../../service/manualService'; // Import manualService for API calls

function CreateManual({ onManualCreated }) {
  const [selectedManual, setSelectedManual] = useState({
    manual_name: '',
    version: '',
    manual_component: '',
    manual_junction_box: '',
    ships: '',
    file: null, // Placeholder for file upload
  });

  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [selectedFileName, setSelectedFileName] = useState(''); // To display the uploaded file name

  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

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
      file: file,
    }));
    setSelectedFileName(file ? file.name : ''); // Set file name for display
  };

  const handleSave = async () => {
    setError('');
    setSuccess('');

    console.log("Selected Manual Data Before Submission:", selectedManual);
    
    if (!selectedManual.manual_name || !selectedManual.version || !selectedManual.file) {
      setError('Manual name, version, and file are required.');
      return;
    }

    const formData = new FormData();
    formData.append('manual_name', selectedManual.manual_name);
    formData.append('version', selectedManual.version);
    formData.append('manual_component', selectedManual.manual_component || '');
    formData.append('manual_junction_box', selectedManual.manual_junction_box || '');
    formData.append('ships', selectedManual.ships || '');
    formData.append('file', selectedManual.file);

    console.log("FormData Contents:");
    for (const [key, value] of formData.entries()) {
      console.log(`${key}:`, value);
    }

    try {
      const newManual = await createManual(formData);
      
      console.log("FormData before sending:");
        for (const [key, value] of formData.entries()) {
          console.log(`${key}:`, value);
        }


      setSuccess('Manual successfully created!');
      setSelectedManual({
        manual_name: '',
        version: '',
        manual_component: '',
        manual_junction_box: '',
        ships: '',
        file: null,
      });
      setSelectedFileName(''); // Reset file name display

      if (onManualCreated) {
        onManualCreated(newManual);
      }

      handleClose();
    } catch (error) {
      console.error('Error creating manual:', error);
      setError(error.response?.data?.message || 'Error creating manual.');
    }
  };

  return (
    <div>
      <Button type="button" onClick={handleShow} className="btn btn-secondary btn-sm edit-button">
        Add Manual to the Database
      </Button>

      <Modal show={showModal} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add Manual</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {error && <Alert variant="danger">{error}</Alert>}
          {success && <Alert variant="success">{success}</Alert>}
          <Form>
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
              <Form.Control type="file" onChange={handleFileChange} />
              {selectedFileName && <small className="text-muted">Selected file: {selectedFileName}</small>}
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSave}>
            Save Manual
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CreateManual;
