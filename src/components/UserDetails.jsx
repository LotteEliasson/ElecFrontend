import { useEffect, useState } from 'react'
import { userDetails } from '../service/userService';

 function UserDetails() {
  const [details, setdetails] = useState([])

  

  useEffect(() => {
    
    const getDetails = async () => {
      try {
        const details = await userDetails();
        setdetails(details);

        console.log("user details ", details)
      } catch (error) {
        console.error("Error fetching user details ", error);
      }
    }
    getDetails();
  }, [])
  
  

  return (
    <div>
      <h2>userDetails</h2>
      <p>{details.username}</p>
      <p>{details.email}</p>
      <p>{details.userrole}</p>
    </div>
  )
}
export default UserDetails;