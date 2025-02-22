import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import "./all.min.css"
import App from './App';
import { BrowserRouter } from 'react-router-dom'
import UserProvider from './context/UsersContext';
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <div>
    <BrowserRouter>
      <UserProvider>
        <App />
      </UserProvider>
    </BrowserRouter>
  </div>

);



