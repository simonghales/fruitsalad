import React from 'react';
import SessionScreenJoin, {SessionScreenJoinBottom} from '../screens/SessionScreenJoin/SessionScreenJoin';
import SessionScreenHub, {SessionScreenHubBottom} from '../screens/SessionScreenHub/SessionScreenHub';

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
    main: () => <SessionScreenJoin/>,
    bottom: () => <SessionScreenJoinBottom/>,
  },
  {
    path: '/session/:id/join',
    main: () => <SessionScreenJoin/>,
    bottom: () => <SessionScreenJoinBottom/>,
  },
  {
    path: '/session/:id/hub',
    main: () => <SessionScreenHub/>,
    bottom: () => <SessionScreenHubBottom/>,
  }
];