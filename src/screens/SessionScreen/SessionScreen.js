import React, {Component} from 'react';
import './SessionScreen.css';
import {
  Link,
  Route,
} from 'react-router-dom';
import {sessionRoutes, RouteInterface} from '../../routes/session';
import MainLayout from '../../components/MainLayout/MainLayout';
import MainLayoutContent from '../../components/MainLayoutContent/MainLayoutContent';
import MainLayoutBottom from '../../components/MainLayoutBottom/MainLayoutBottom';

class SessionScreen extends Component {

  props: {};

  state: {};

  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
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
            <div>
              <Link to='/session/thing'>home</Link>
              <Link to='/session/thing/join'>name</Link>
              <Link to='/session/thing/hub'>image</Link>
            </div>
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
      </div>
    );
  }
}

export default SessionScreen;

