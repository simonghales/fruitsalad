import React, {Component} from 'react';
import {
  Route,
} from 'react-router-dom';
import {sessionRoutes, RouteInterface} from '../../routes/session';

const SessionScreenRoutes = ({top = true}) => {
    return sessionRoutes.map((route: RouteInterface, index) => (
      <Route key={index}
             path={route.path}
             exact={route.exact}
             component={route.main}/>
    ));
};

export default SessionScreenRoutes;
