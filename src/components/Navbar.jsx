// components/Navbar.js

import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { Navbar as BootstrapNavbar, Nav, Container } from 'react-bootstrap';
import AuthContext from '../context/AuthContext';

function Navbar() {

  const { isLoggedIn, role, logout } = useContext(AuthContext);

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BootstrapNavbar.Brand as={Link} to="/">
          Electrical Parts
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/">
              Home
            </Nav.Link>
            <Nav.Link as={Link} to="/about">
              About
            </Nav.Link>
            <Nav.Link as={Link} to="/contact">
              Contact
            </Nav.Link>
            {!isLoggedIn ? (
            <>
              <Nav.Link as={Link} to="/signup">
                Signup
              </Nav.Link>
              <Nav.Link as={Link} to="/login">
                Login
              </Nav.Link>
            </>
            ):(
              <>
              {role === "admin" && (
                <>
                  <Nav.Link as={Link} to="/user">
                    User
                  </Nav.Link>
                  <Nav.Link as={Link} to="/ships">
                    Ship
                  </Nav.Link>
                  <Nav.Link as={Link} to="/owner">
                    Owner
                  </Nav.Link>
                  <Nav.Link as={Link} to="/engine">
                    Engine
                  </Nav.Link>
                  <Nav.Link as={Link} to="/components">
                    Components
                  </Nav.Link>
                  <Nav.Link as={Link} to="/junctionBox">
                    Junction Box
                  </Nav.Link>
                </>
              )}
              <Nav.Link as={Link} to="/" onClick={logout}>
                Logout
              </Nav.Link>
            </>
          )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>
    </BootstrapNavbar>
  );
}

export default Navbar;
