import React from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter as Router,
  // HashRouter as Router,
} from 'react-router-dom';
import {Provider} from 'react-redux';
import './styles/base.css';
import App from './components/App/App';
import {store} from './redux/index';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App/>
    </Router>
  </Provider>
  , document.getElementById('root'));
// registerServiceWorker();