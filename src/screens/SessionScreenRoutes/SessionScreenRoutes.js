import React, {Component} from 'react';
import {
  Route,
} from 'react-router-dom';
import {sessionRoutes, RouteInterface} from '../../routes/session';
import {CSSTransition, TransitionGroup} from 'react-transition-group';
import {Switch, withRouter} from 'react-router';
import SessionScreenDefault from '../SessionScreenDefault/SessionScreenDefault';
import SessionScreenHost from '../SessionScreenHost/SessionScreenHost';
import SessionScreenJoin from '../SessionScreenJoin/SessionScreenJoin';
import SessionScreenHub from '../SessionScreenHub/SessionScreenHub';

const SessionScreenRoutes = ({location}) => {
  const currentKey = location.pathname;
  return (
    <TransitionGroup component='div' className='SessionScreenRoutes'>
      <CSSTransition key={currentKey} timeout={500} classNames='pageTransition' appear>
        <Switch location={location}>
          <Route key='/session/:id'
                 path='/session/:id'
                 exact={true}
                 component={SessionScreenDefault}/>
          <Route key='/session/:id'
                 path='/session/:id'
                 exact={true}
                 component={SessionScreenDefault}/>
          <Route key='/session/:id/host'
                 path='/session/:id/host'
                 exact={true}
                 component={SessionScreenHost}/>
          <Route key='/session/:id/join'
                 path='/session/:id/join'
                 exact={true}
                 component={SessionScreenJoin}/>
          <Route key='/session/:id/hub'
                 path='/session/:id/hub'
                 exact={true}
                 component={SessionScreenHub}/>
        </Switch>
      </CSSTransition>
    </TransitionGroup>
  );
};

export default withRouter(SessionScreenRoutes);
