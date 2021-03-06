import React from 'react';
import SessionScreenJoin from '../screens/SessionScreenJoin/SessionScreenJoin';
import SessionScreenHub from '../screens/SessionScreenHub/SessionScreenHub';
import SessionScreenHost from '../screens/SessionScreenHost/SessionScreenHost';
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
  },
  {
    path: '/session/:id/host',
    exact: true,
    main: () => <SessionScreenHost/>,
  },
  {
    path: '/session/:id/join',
    exact: true,
    main: () => <SessionScreenJoin/>,
  },
  {
    path: '/session/:id/hub',
    exact: true,
    main: () => <SessionScreenHub/>,
  }
];