import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { FavoritesContextProvider } from './components/entities/medicines/favourites';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <FavoritesContextProvider>
    <App />
  </FavoritesContextProvider>
);