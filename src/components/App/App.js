import React, {Component} from 'react';
import './App.css';
import {
  Route,
} from 'react-router-dom';
import LandingScreen from '../LandingScreen/LandingScreen';
import SessionScreen from '../../screens/SessionScreen/SessionScreen';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='App'>
        <Route key='/' exact path='/' component={LandingScreen}/>
        <Route key='/session' path='/session' component={SessionScreen}/>
        {/*<Route key='/session/:id' path='/session/:id' component={SessionScreen}/>*/}
      </div>
    );
  }
}

export default App;
