import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const title = "Medicine, Exercise and Appointment Tracker";
document.title = title;

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <App />
);