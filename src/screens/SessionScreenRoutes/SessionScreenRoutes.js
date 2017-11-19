import React, {Component} from 'react';
import {
  Route,
} from 'react-router-dom';
import {sessionRoutes, RouteInterface} from '../../routes/session';

const SessionScreenRoutes = ({top = true}) => {
  if (top) {
    return sessionRoutes.map((route: RouteInterface, index) => (
      <Route key={index}
             path={route.path}
             exact={route.exact}
             component={route.main}/>
    ));
  } else {
    return sessionRoutes.map((route: RouteInterface, index) => (
      <Route key={index}
             path={route.path}
             exact={route.exact}
             component={route.bottom}/>
    ));
  }
};

export default SessionScreenRoutes;
