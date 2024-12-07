//Rewriten template from education on third semester using Navigo Router.

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import Home from './pages/Home'
import Contact from './pages/Contact'
import About from './pages/About'
import NotFound from './pages/NotFound'
import LoginUser from './pages/user/LoginUser';
import UserList from './pages/user/userList';
import UserSignup from './pages/user/UserSignup';
import ShipList from './pages/ship/shipList';
import OwnerList from './pages/owner/OwnerList';
import EngineList from './pages/engine/EngineList';

function App() {
  return (
    <Router>
      <Navbar />
      <div id="content" className="container mt-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signup" element={<UserSignup />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/user" element={<UserList />} />
          <Route path="/ships" element={<ShipList />} />
          <Route path="/owner" element={<OwnerList />} />
          <Route path="/engine" element={<EngineList />} />
          {/* Catch all other routes */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;