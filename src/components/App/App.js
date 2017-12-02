import React, {Component} from 'react';
import './App.css';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import LandingScreen from '../LandingScreen/LandingScreen';
import SessionScreen from '../../screens/SessionScreen/SessionScreen';
import GamesScreen from '../../screens/GamesScreen/GamesScreen';
import {AppState} from '../../redux/index';
import {UserIsAuthenticated} from '../../auth/UserIsAuthenticated/UserIsAuthenticated';
import {Redirect, Switch} from 'react-router';
import DrawDuoDisplay from '../../games/DrawDuo/screens/DrawDuoDisplay/DrawDuoDisplay';
import DrawDuoDisplayNEW from '../../games/DrawDuo/screens/DrawDuoDisplayNEW/DrawDuoDisplay';
import DrawDuoHostWrapper from '../../games/DrawDuo/screens/DrawDuoHostWrapper/DrawDuoHostWrapper';
import DrawDuoGameHostNEW from '../../games/DrawDuo/components/DrawDuoGameHostNEW/DrawDuoGameHost';

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
        <Switch>
          <Route key='/' exact path='/' component={LandingScreen}/>
          <Route key='/session/:id' path='/session/:id' component={SessionScreen}/>
          <Route key='/display/:id' path='/display/:id' component={DrawDuoDisplay}/>
          <Route key='/host/:id' path='/host/:id' component={DrawDuoHostWrapper}/>
          <Route key='/flow/:id' path='/flow/:id' component={DrawDuoDisplayNEW}/>
          <Route key='/flowHost/:id' path='/flowHost/:id' component={DrawDuoGameHostNEW}/>
          <Route key='/drawDuo' path='/drawDuo' component={GamesScreen}/>
          <Route key='/games' path='/games' component={DrawDuoDisplay}/>
          <Route key='/test' path='/test' component={UserIsAuthenticated(() => (
            <div>test</div>
          ))}/>
        </Switch>
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedApp));
