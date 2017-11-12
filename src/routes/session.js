import React from 'react';
import SessionScreenJoin from '../screens/SessionScreenJoin/SessionScreenJoin';
import SessionScreenHub from '../screens/SessionScreenHub/SessionScreenHub';
import SessionScreenHost from '../screens/SessionScreenHost/SessionScreenHost';
import SessionScreenHostBottom from '../screens/SessionScreenHost/SessionScreenHostBottom';
import SessionScreenJoinBottom from '../screens/SessionScreenJoin/SessionScreenJoinBottom';
import SessionScreenHubBottom from '../screens/SessionScreenHub/SessionScreenHubBottom';
import SessionScreenDefault from '../screens/SessionScreenDefault/SessionScreenDefault';

export interface RouteInterface {
  path: string,
  exact: boolean,
  main: any,
  bottom: any,
}

export const sessionRoutes: RouteInterface[] = [
  {
    path: '/session/:id',
    exact: true,
    main: () => <SessionScreenDefault/>,
    bottom: null,
  },
  {
    path: '/session/:id/host',
    exact: true,
    main: () => <SessionScreenHost/>,
    bottom: () => <SessionScreenHostBottom/>,
  },
  {
    path: '/session/:id/join',
    exact: true,
    main: () => <SessionScreenJoin/>,
    bottom: () => <SessionScreenJoinBottom/>,
  },
  {
    path: '/session/:id/hub',
    exact: true,
    main: () => <SessionScreenHub/>,
    bottom: () => <SessionScreenHubBottom/>,
  }
];