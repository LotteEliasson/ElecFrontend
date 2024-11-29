//Rewriten template from education on third semester using Navigo Router.

import { useState, useEffect } from 'react';
import Navigo from 'navigo';
import DOMPurify from 'dompurify';
import 'bootstrap/dist/css/bootstrap.min.css';

import Navbar from './components/Navbar';
import LoginUser from './components/LoginUser';
import UserList from './components/userList';
import UserDetails from './components/UserDetails';


export const router = new Navigo('/', { hash: true });

function Home() {
  return (
    <div>
      <Navbar />
      <h2>Welcome to the Home Page</h2>
      <p>This is the content of the Home Route.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <Navbar />
      <h2>About Us</h2>
      <p>Learn more about our organization on this page.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <Navbar />
      <h2>Contact Us</h2>
      <p>Reach out to us at contact@example.com.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <Navbar />
      <h2>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function Login() {
  return (
    <div>
      <Navbar />
      <LoginUser />
    </div>
  );
}

function User() {
  return (
    <div>
      <Navbar />
      <h2>User Information</h2>
      <UserDetails />
      <UserList />
    </div>
  );
}


// App component with Navigo router
function App() {
  const [currentRoute, setCurrentRoute] = useState('/');

  useEffect(() => {
    // Configure router with Navigo
    router
      .on({
        '/': () => {
          setCurrentRoute('/');
        },
        '/about': () => {
          setCurrentRoute('/about');
        },
        '/contact': () => {
          setCurrentRoute('/contact');
        },
        '/login': () => {
          setCurrentRoute('/login');
        },
        '/user': () => {
          setCurrentRoute('/user');
        },
      })
      .notFound(() => {
        setCurrentRoute('');
      })
      .resolve();

    
  }, []);

  let content;
  switch (currentRoute) {
    case '/':
      content = <Home />;
      break;
    case '/about':
      content = <About />;
      break;
    case '/contact':
      content = <Contact />;
      break;
    case '/login':
      content = <Login />;
      break;
    case '/user':
      content = <User />;
      break;
    default:
      content = <NotFound />;
  }


  return (
    <div>
      <div id="content">{content}</div>
    </div>
  );
}

export default App;
