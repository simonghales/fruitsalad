import React, {Component} from 'react';
import './App.css';
import {
  Route,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import LandingScreen from '../LandingScreen/LandingScreen';
import SessionScreen from '../../screens/SessionScreen/SessionScreen';
import GamesScreen from '../../screens/GamesScreen/GamesScreen';
import DrawDuoGuessDisplay from '../../games/DrawDuo/screens/DrawDuoGuessDisplay/DrawDuoGuessDisplay';
import {AppState} from '../../redux/index';

class App extends Component {

  props: {
    firebase: any,
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    console.log('props?', this.props);
    this.props.firebase.auth().signInAnonymously()
      .then((data) => {
        console.log('signed in...', data);
      }, () => {
        console.warn('failed to sign in anonymously');
      });
  }

  render() {

    // todo - if not auth, display temporary something...

    return (
      <div className='App'>
        <Route key='/' exact path='/' component={LandingScreen}/>
        <Route key='/session/:id' path='/session/:id' component={SessionScreen}/>
        <Route key='/games' path='/games' component={DrawDuoGuessDisplay}/>
        <Route key='/test' path='/test' component={() => (
          <div>test</div>
        )}/>
        {/*<Route key='/session/:id' path='/session/:id' component={SessionScreen}/>*/}
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    firebase: state.firebase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const wrappedApp = firebaseConnect()(App);

export default connect(mapStateToProps, mapDispatchToProps)(wrappedApp);
