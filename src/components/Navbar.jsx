import { useContext } from "react";
import AuthContext from "../context/AuthContext";


function Navbar() {
  const {isLoggedIn, role, logout} = useContext(AuthContext);



  return (
    <nav className="navbar navbar-expand-lg navbar-light bg-light">
      <div className="container-fluid">
        <a className="navbar-brand" href="/">Database Management</a>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
          <div className="collapse navbar-collapse" id="navbarNav">
            <ul id="menu" className="navbar-nav">
              <li className="nav-item active">
                <a className="nav-link" href="/" data-navigo>Home</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/about" data-navigo>About</a>
              </li>
              <li className="nav-item">
                <a className="nav-link" href="/contact" data-navigo>Contact</a>
              </li>
              {!isLoggedIn ? (
                
              <li className="nav-item">
                <a className="nav-link" href="/login" data-navigo>Login</a>
              </li>

              ) : (
              <>
              {role === 'admin' && (
                <>
                  <li className="nav-item">
                    <a className="nav-link" href="/user" data-navigo>User</a>
                  </li>
                </>
              )}
                <li className="nav-item">
                  <a className="nav-link" href="/" onClick={() => logout() }>Logout</a>
                </li>
               
              </>
              )}
            </ul>
          </div>
        </div>
    </nav>
  );
}

export default Navbar;
