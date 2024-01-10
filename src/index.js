import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';
import { UserProvider } from './context/UserContext';
import { BookProvider } from './context/BookContext';
import { FavoritosProvider } from './context/FavoritosContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <UserProvider>
      <FavoritosProvider>
        <BookProvider>
          <App />
        </BookProvider>
      </FavoritosProvider>
    </UserProvider>
  </React.StrictMode>
);
