import React from 'react';
import SessionScreenJoin from '../screens/SessionScreenJoin/SessionScreenJoin';
import SessionScreenHub, {SessionScreenHubBottom} from '../screens/SessionScreenHub/SessionScreenHub';
import SessionScreenHost from '../screens/SessionScreenHost/SessionScreenHost';
import SessionScreenHostBottom from '../screens/SessionScreenHost/SessionScreenHostBottom';
import SessionScreenJoinBottom from '../screens/SessionScreenJoin/SessionScreenJoinBottom';

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
    path: '/session/:id/host',
    exact: true,
    main: () => <SessionScreenHost/>,
    bottom: () => <SessionScreenHostBottom/>,
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