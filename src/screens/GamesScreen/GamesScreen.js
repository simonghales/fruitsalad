import React, {Component} from 'react';
import './GamesScreen.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {
  matchPath,
  Route,
} from 'react-router-dom';
import {sessionRoutes, RouteInterface} from '../../routes/session';
import MainLayout from '../../components/MainLayout/MainLayout';
import MainLayoutContent from '../../components/MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../../components/MainLayoutBottom/MainLayoutBottom';
import QuitSession from '../../modals/QuitSession/QuitSession';
import {closeQuitModal, SessionState, setSessionCode} from '../../redux/reducers/session/reducer';
import SessionInPlay from '../../components/SessionInPlay/SessionInPlay';

class GamesScreen extends Component {

  props: {};

  state: {};

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <MainLayout>
        <MainLayoutContent noBottom={true}>
          <SessionInPlay/>
        </MainLayoutContent>
      </MainLayout>
    );
  }

}

const mapStateToProps = (state: AppState) => {
  return {};
};

const mapDispatchToProps = (dispatch) => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(GamesScreen);

