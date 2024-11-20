//Rewriten template from education on third semester using Navigo Router.

import { useState, useEffect } from 'react';
import Navigo from 'navigo';
import DOMPurify from 'dompurify';
import Navbar from './components/Navbar';
import 'bootstrap/dist/css/bootstrap.min.css';

import UserList from './components/userList';


const router = new Navigo('/', { hash: true });


function Home() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      <h2>Welcome to the Home Page</h2>
      <p>This is the content of the Home Route.</p>
    </div>
  );
}

function About() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <h2>About Us</h2>
      <p>Learn more about our organization on this page.</p>
    </div>
  );
}

function Contact() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <h2>Contact Us</h2>
      <p>Reach out to us at contact@example.com.</p>
    </div>
  );
}

function NotFound() {
  return (
    <div>
      <div>
        <Navbar />
      </div>
      
      <h2>404 Not Found</h2>
      <p>The page you are looking for does not exist.</p>
    </div>
  );
}

function Login() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <h2>Login</h2>
      <p></p>
    </div>
  );
}

function User() {
  return (
    <div>
      <div>
        <Navbar />
      </div>

      <h2>User Information</h2>
      <UserList />
      <p></p>
    </div>
  );
}

// Usage if external API is used to purify string from XSS-attacks (Cross-Site Scripting)
//Kept from education if needed.
function sanitizeStringWithTableRows(tableRows) {
  let secureRows = DOMPurify.sanitize('<table>' + tableRows + '</table>');
  secureRows = secureRows.replace('<table>', '').replace('</table>', '');
  return secureRows;
}

// App component with Navigo router
function App() {
  const [content, setContent] = useState(<Home />);
  const [activePath, setActivePath] = useState('/');

  useEffect(() => {
    // Configure router with Navigo
    router
      .on({
        '/': () => {
          setContent(<Home />);
          setActivePath('/');
        },
        '/about': () => {
          setContent(<About />);
          setActivePath('/about');
        },
        '/contact': () => {
          setContent(<Contact />);
          setActivePath('/contact');
        },
        '/login': () => {
          setContent(<Login />);
          setActivePath('/login');
        },
        '/user': () => {
          setContent(<User />);
          setActivePath('/user');
        },
      })
      .notFound(() => {
        setContent(<NotFound />);
        setActivePath('');
      })
      .resolve();

    // Sets active path when routing.
    router.hooks({
      before: (done, match) => {
        setActivePath(match.url);
        done();
      },
    });
  }, []);


  return (
    <div>
      <div id="content">{content}</div>
    </div>
  );
}

export default App;
