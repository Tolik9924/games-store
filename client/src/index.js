import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import './index.css';
import App from './App';
import { BrowserRouter as Router } from 'react-router-dom';
import AppProvider from './context/AppProvider';
import { storeData } from './store';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <Provider store={storeData}>
        <AppProvider>
          <App />
        </AppProvider>
      </Provider>
    </Router>
  </React.StrictMode>
);