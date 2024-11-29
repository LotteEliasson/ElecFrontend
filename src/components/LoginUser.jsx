import { useState, useContext } from "react";
import { loginUser } from "../service/userService";
import { router } from "../App";
import AuthContext from "../context/AuthContext";


function LoginUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  // Access the login function from AuthContext
  const { login } = useContext(AuthContext);

  const handleLogin = async(e) => {
    //Prevent browser from unintentionally reloading the page/ submitting the form
    //reload and submit is only handled in JS not by the browser.
    e.preventDefault();

    try {
      
      const data = await loginUser(email, password);
      if(data && data.token){
        login(data.token);
        setMessage('login successful');
        router.navigate('/user');

      } else {
        setMessage('invalid email or password');
      }
    } catch (error) {
      console.error("Login error", error);
      setMessage("Invalid email or password, Please try again.");
    }

  }

  return(
    <div>
      <form onSubmit={handleLogin}>
        <h2>Login with email and password</h2>
        <input
        type="text"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        />

        <input 
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        />

        <button type="submit">Login</button>        
      </form>
      {message && <p>{message}</p>}
    </div>
  )
}


export default LoginUser;