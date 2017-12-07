import React, {Component} from 'react';
import './App.css';
import {
  Route,
  withRouter,
} from 'react-router-dom';
import {connect} from 'react-redux';
import {firebaseConnect, isLoaded, isEmpty, toJS} from 'react-redux-firebase';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import LandingScreen from '../LandingScreen/LandingScreen';
import SessionScreen from '../../screens/SessionScreen/SessionScreen';
import GamesScreen from '../../screens/GamesScreen/GamesScreen';
import {AppState} from '../../redux/index';
import {UserIsAuthenticated} from '../../auth/UserIsAuthenticated/UserIsAuthenticated';
import {Redirect, Switch} from 'react-router';
import DrawDuoDisplay from '../../games/DrawDuo/screens/DrawDuoDisplay/DrawDuoDisplay';
import SessionRedirect from '../../screens/SessionRedirect/SessionRedirect';
import AppLoadingScreen from '../../screens/AppLoadingScreen/AppLoadingScreen';
import DrawDuoController from '../../games/DrawDuo/newscreens/DrawDuoController/DrawDuoController';
import DrawDuoHostWrapper from '../../games/DrawDuo/screens/DrawDuoHostWrapper/DrawDuoHostWrapper';
import JoinScreen from '../../screens/JoinScreen/JoinScreen';
import HostScreen from '../../screens/HostScreen/HostScreen';

class App extends Component {

  props: {
    firebase: any,
    isAuthed: boolean,
    location: {},
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

    const {isAuthed, location} = this.props;

    if (!isAuthed) {
      return <AppLoadingScreen/>
    }

    const currentKey = location.pathname.split('/')[1] || '/';

    return (
      <div className='App'>
        <TransitionGroup component='main' className='App__transitionContainer'>
          <CSSTransition key={currentKey} timeout={500} classNames='pageTransition' appear>
            <Switch location={location}>
              <Route key='/' exact path='/' component={LandingScreen}/>
              <Route key='/join' exact path='/join' component={JoinScreen}/>
              <Route key='/host' exact path='/host' component={HostScreen}/>
              <Route key='/session/:id' path='/session/:id' component={SessionScreen}/>
              <Route key='/display/:id' path='/display/:id' component={DrawDuoDisplay}/>
              <Route key='/host/:id' path='/host/:id' component={DrawDuoHostWrapper}/>
              <Route key='/drawDuo' path='/drawDuo' component={GamesScreen}/>
              <Route key='/test' path='/test' component={UserIsAuthenticated(() => (
                <div>test</div>
              ))}/>
              <Route key='/controller/:id' path='/controller/:id' component={DrawDuoController}/>
              <Route key='/:id' path='/:id' component={SessionRedirect}/>
            </Switch>
          </CSSTransition>
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    isAuthed: isLoaded(state.firebase.auth) && !isEmpty(state.firebase.auth),
    firebase: state.firebase,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

const wrappedApp = firebaseConnect()(App);

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(wrappedApp));
