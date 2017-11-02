import React, {Component} from 'react';
import './App.css';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import LandingScreen from '../LandingScreen/LandingScreen';
import SessionScreen from '../SessionScreen/SessionScreen';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='App'>
        <Route key='/' exact path='/' component={LandingScreen}/>
        <Route key='/session' exact path='/session' component={SessionScreen}/>
      </div>
    );
  }
}

export default App;
