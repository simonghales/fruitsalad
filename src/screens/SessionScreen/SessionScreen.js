import React, {Component} from 'react';
import './SessionScreen.css';
import {connect} from 'react-redux';
import {TransitionGroup, CSSTransition} from 'react-transition-group';
import {
  Link,
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
  }

  render() {
    const {closeQuitModal, quitModalOpen} = this.props;
    return (
      <div className='SessionScreen'>
        <MainLayout>
          <MainLayoutContent>
            {
              sessionRoutes.map((route: RouteInterface, index) => (
                <Route key={index}
                       path={route.path}
                       exact={route.exact}
                       component={route.main}/>
              ))
            }
          </MainLayoutContent>
          <MainLayoutBottom>
            {/*<div>*/}
            {/*<Link to='/session/thing'>home</Link>*/}
            {/*<Link to='/session/thing/join'>name</Link>*/}
            {/*<Link to='/session/thing/hub'>image</Link>*/}
            {/*</div>*/}
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
                <QuitSession close={closeQuitModal}/>
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

