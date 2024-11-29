import { createContext, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { default as jwtDecode } from 'jwt-decode';



const AuthContext = createContext();

export const AuthProvider = ({ children }) => {


  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [role, setRole] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      try {
        const { role } = jwtDecode(token);
        setIsLoggedIn(true);
        setRole(role);
      } catch {
        setIsLoggedIn(false);
        setRole(null);
      }
    }
  }, []);

  const login = (token) => {
    localStorage.setItem('token', token);
    try {
      const { role } = jwtDecode(token);
      setIsLoggedIn(true);
      setRole(role);
    } catch {
      setIsLoggedIn(false);
      setRole(null);
    }
  };

  const logout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    setRole(null);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, role, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export default AuthContext;
