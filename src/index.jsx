import ReactDOM from 'react-dom/client';
import App from './App';
import './styles/menu-styles.css';
import { AuthProvider } from './context/AuthContext';

// Render App-component in DOM-element with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <AuthProvider>
    <App />
  </AuthProvider>
);
