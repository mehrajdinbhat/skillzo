import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';   


createRoot(document.getElementById("root")).render(
  <BrowserRouter>
      <App />
  </BrowserRouter>,
);
