import React, {Component} from 'react';
import './SessionScreen.css';
import classNames from 'classnames';
import {connect} from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {
  withRouter,
} from 'react-router-dom';
import {sessionRoutes, RouteInterface} from '../../routes/session';
import MainLayout from '../../components/MainLayout/MainLayout';
import MainLayoutContent from '../../components/MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../../components/MainLayoutBottom/MainLayoutBottom';
import QuitSession from '../../modals/QuitSession/QuitSession';
import {closeQuitModal, SessionState, setSessionCode} from '../../redux/reducers/session/reducer';
import {AppState} from '../../redux/index';
import SessionScreenRoutes from '../SessionScreenRoutes/SessionScreenRoutes';
import SessionNotFound from '../../modals/SessionNotFound/SessionNotFound';

class SessionScreen extends Component {

  props: {
    match: any,
    history: any,
    showSessionBottom: boolean,
    quitModalOpen: boolean,
    invalidSession: boolean,
    closeQuitModal(): void,
    setSessionCode(sessionCode: string): void,
  };

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
    this.quitSession = this.quitSession.bind(this);
  }

  componentDidMount() {
    const {match, setSessionCode} = this.props;
    setSessionCode(match.params.id);
  }

  quitSession() {
    const {closeQuitModal, history} = this.props;
    closeQuitModal();
    history.push('/');
  }

  render() {
    const {closeQuitModal, showSessionBottom, quitModalOpen, invalidSession} = this.props;
    return (
      <div className='SessionScreen'>
        <MainLayout>
          <MainLayoutContent noBottom={!showSessionBottom}>
            <SessionScreenRoutes top={true}/>
          </MainLayoutContent>
          <MainLayoutBottom hide={!showSessionBottom}>
            <SessionScreenRoutes top={false}/>
          </MainLayoutBottom>
        </MainLayout>
        <TransitionGroup>
          {
            quitModalOpen ? (
              <CSSTransition
                timeout={350}
                classNames='fade'
                key='quitSession'>
                <QuitSession close={closeQuitModal} quit={this.quitSession}/>
              </CSSTransition>
            ) : null
          }
        </TransitionGroup>
        <TransitionGroup>
          {
            invalidSession ? (
              <CSSTransition
                timeout={350}
                classNames='fade'
                key='quitSession'>
                <SessionNotFound/>
              </CSSTransition>
            ) : null
          }
        </TransitionGroup>
      </div>
    );
  }
}

const mapStateToProps = (state: AppState) => {
  return {
    showSessionBottom: state.session.showSessionBottom,
    quitModalOpen: state.session.quitModalOpen,
    invalidSession: state.session.invalidSession,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeQuitModal: () => dispatch(closeQuitModal()),
    setSessionCode: (sessionCode: string) => dispatch(setSessionCode(sessionCode)),
  };
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(SessionScreen));

