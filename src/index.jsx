import ReactDOM from 'react-dom/client';
import App from './app';
import './styles/menu-styles.css';

// Render App-component in DOM-element with id 'root'
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
