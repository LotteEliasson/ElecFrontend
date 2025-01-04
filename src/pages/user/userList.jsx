  import { useState, useEffect } from "react";
  import { fetchUsers, updateUser, deleteUser } from '../../service/userService'
  import { Modal, Button, Form } from 'react-bootstrap';
  import UserDetails from '../../components/UserDetails'
  import './userList.css';


  function UserList(){
    
    const [users, setUsers] = useState([]);
    const [showModal, setShowModal] = useState(false);
    const [selectedUser, setSelectedUser] = useState({
      user_id: '',
      username: '',
      email: '',
      userrole: '',
      company: ''
    });
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [userToDelete, setUserToDelete] = useState(null);
    
    const getUsers = async () => {
      try {
        const userData = await fetchUsers();
        console.log("Fetched user data: ", userData);
        setUsers(userData); 
      } catch (error) {
        console.error("Error fetching users", error);
      }
    }

    useEffect(() => {
      getUsers();
    },[])

    const handleClose = () => setShowModal(false);

    const handleShow = (user) => {
      setSelectedUser(user);
      setShowModal(true);
    }

    const handleChange = (e) => {
      const { name, value } = e.target;
      setSelectedUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    }

    const handleSave = async () => {
      console.log("Save button clicked");
      try {
        await updateUser(selectedUser.user_id, selectedUser);
        // update user list after edit user
        getUsers();
        handleClose();
      } catch (error) {
        console.error("Error updating user", error);
      }
    }

    const handleCloseDelete = () => setShowDeleteModal(false);

    const handleDelete = (user) => {
      setUserToDelete(user);
      setShowDeleteModal(true);
    }

    const confirmDelete = async () => {
      
      if(!userToDelete) return;

      try {
        await deleteUser(userToDelete.user_id);
        console.log("User deleted successfully");

        handleCloseDelete();
        setUserToDelete(null);
        getUsers();

      } catch (error) {
        console.error("Error deleting user", error);

      }
    }

    const deleteCancel = () => {
      setShowDeleteModal(false);
      setUserToDelete(null);
    }
    
    return(
      <div className="container mt-4">
        <UserDetails />
        <h2 className="mb-4">User List</h2>
        <table className="table table-striped">
          <thead className="thead-dark">
            <tr>
              <th scope="col">ID</th>
              <th scope="col">Username</th>
              <th scope="col">Email</th>
              <th scope="col">Role</th>
              <th scope="col">Company</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.user_id}>
                <th scope="row">{user.user_id}</th>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>{user.userrole}</td>
                <td>{user.company}</td>
                <td>
                <button type="button" onClick={() => handleShow(user)} className="btn btn-secondary btn-sm edit-button">Edit</button>  
                <button type="button" onClick={() => handleDelete(user)} className="btn btn-secondary btn-sm edit-button">Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

{/* Modal for editing a user*/}
        <Modal show={showModal} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="formUserId">
                <Form.Label>ID</Form.Label>
                <Form.Control 
                  type="text" 
                  name="user_id" 
                  value={selectedUser.user_id} 
                  readOnly 
                />
              </Form.Group>

              <Form.Group controlId="formUsername">
                <Form.Label>Username</Form.Label>
                <Form.Control 
                  type="text" 
                  name="username" 
                  value={selectedUser.username} 
                  onChange={handleChange} 
                />
              </Form.Group>

              <Form.Group controlId="formEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control 
                  type="email" 
                  name="email" 
                  value={selectedUser.email} 
                  onChange={handleChange} 
                />
              </Form.Group>

              <Form.Group controlId="formUserRole">
                <Form.Label>Role</Form.Label>
                <Form.Control 
                  type="text" 
                  name="userrole" 
                  value={selectedUser.userrole} 
                  onChange={handleChange} 
                />
                </Form.Group>
                <Form.Group controlId="formUserRole">
                <Form.Label>Company</Form.Label>
                <Form.Control 
                  type="text" 
                  name="company" 
                  value={selectedUser.company} 
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
            {userToDelete ? (
              <>
                <p>Are you sure you want to delete the following user?</p>
                <ul>
                  <li><strong>ID:</strong> {userToDelete.user_id}</li>
                  <li><strong>Username:</strong> {userToDelete.username}</li>
                  <li><strong>Email:</strong> {userToDelete.email}</li>
                  <li><strong>Role:</strong> {userToDelete.userrole}</li>
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


  export default UserList;