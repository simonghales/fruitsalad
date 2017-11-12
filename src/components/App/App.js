import React, {Component} from 'react';
import './App.css';
import {
  Route,
} from 'react-router-dom';
import LandingScreen from '../LandingScreen/LandingScreen';
import SessionScreen from '../../screens/SessionScreen/SessionScreen';
import GamesScreen from '../../screens/GamesScreen/GamesScreen';

class App extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className='App'>
        <Route key='/' exact path='/' component={LandingScreen}/>
        <Route key='/session/:id' path='/session/:id' component={SessionScreen}/>
        <Route key='/games' path='/games' component={GamesScreen}/>
        {/*<Route key='/session/:id' path='/session/:id' component={SessionScreen}/>*/}
      </div>
    );
  }
}

export default App;
