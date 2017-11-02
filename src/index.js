import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  // HashRouter as Router,
} from 'react-router-dom';
import './styles/base.css';
import App from './components/App/App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Router>
    <App/>
  </Router>
  , document.getElementById('root'));
registerServiceWorker();