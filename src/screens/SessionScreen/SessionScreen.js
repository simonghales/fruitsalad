import React, {Component} from 'react';
import './SessionScreen.css';
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
import {closeQuitModal, SessionState, setSessionCode} from '../../redux/reducers/session';

class SessionScreen extends Component {

  props: {
    match: any,
    history: any,
    showSessionBottom: boolean,
    quitModalOpen: boolean,
    closeQuitModal(): void,
    setSessionCode(sessionCode: string): void,
  };

  state: {};

  constructor(props) {
    super(props);
    const {match, setSessionCode} = props;
    setSessionCode(match.params.id);
    this.state = {};
    this.quitSession = this.quitSession.bind(this);
  }

  quitSession() {
    const {closeQuitModal, history} = this.props;
    closeQuitModal();
    history.push('/');
  }

  render() {
    const {closeQuitModal, showSessionBottom, quitModalOpen} = this.props;
    return (
      <div className='SessionScreen'>
        <MainLayout>
          <MainLayoutContent noBottom={!showSessionBottom}>
            {
              sessionRoutes.map((route: RouteInterface, index) => (
                <Route key={index}
                       path={route.path}
                       exact={route.exact}
                       component={route.main}/>
              ))
            }
          </MainLayoutContent>
          <MainLayoutBottom hide={!showSessionBottom}>
            {
              sessionRoutes.map((route: RouteInterface, index) => (
                <Route key={index}
                       path={route.path}
                       exact={route.exact}
                       component={route.bottom}/>
              ))
            }
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
      </div>
    );
  }
}

const mapStateToProps = (state: SessionState) => {
  return {
    showSessionBottom: state.showSessionBottom,
    quitModalOpen: state.quitModalOpen,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    closeQuitModal: () => dispatch(closeQuitModal()),
    setSessionCode: (sessionCode: string) => dispatch(setSessionCode(sessionCode)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SessionScreen);

