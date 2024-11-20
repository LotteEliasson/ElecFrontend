import { useState, useEffect } from "react";
import { fetchUsers } from '../service/userService'

function UserList(){
  const [users, setUsers] = useState([]);

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

  return(
    <div>
      <h2>User List</h2>
      <ul>
        {users.map((user) => (
          <li key={user.user_id}>
            {user.name} - {user.email}
          </li>
        ))}
      </ul>
    </div>
  )
}

export default UserList;