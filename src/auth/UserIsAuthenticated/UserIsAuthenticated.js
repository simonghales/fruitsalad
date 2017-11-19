import React from 'react';
import {connectedRouterRedirect} from 'redux-auth-wrapper/history4/redirect';
import locationHelperBuilder from 'redux-auth-wrapper/history4/locationHelper';
import {pathToJS} from 'react-redux-firebase';
import firebase from 'firebase';

const LoadingScreen = () => (
  <div>HELLO WORLD!</div>
)


const locationHelper = locationHelperBuilder({});

// export const UserIsAuthenticated = connectedRouterRedirect({
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || '/login',
//   allowRedirectBack: true,
//   authenticatedSelector: ({firebase}) => pathToJS(firebase, 'auth') !== null,
//   authenticatingSelector: ({firebase: {auth}}) =>
//     pathToJS(firebase, 'isInitializing') === true ||
//     pathToJS(firebase, 'auth') === undefined,
//   AuthenticatingComponent: LoadingScreen,
//   wrapperDisplayName: 'UserIsAuthenticated',
// });

// export const UserIsAuthenticated = connectedRouterRedirect({
//   wrapperDisplayName: 'UserIsAuthenticated',
//   AuthenticatingComponent: () => (<div>hi</div>),
//   allowRedirectBack: true,
//   redirectPath: (state, ownProps) =>
//     locationHelper.getRedirectQueryParam(ownProps) || '/login',
//   authenticatingSelector: ({firebase: {auth, profile, isInitializing}}) =>
//     !auth.isLoaded || isInitializing === true,
//   authenticatedSelector: ({firebase: {auth}}) =>
//     auth.isLoaded && !auth.isEmpty,
//   redirectAction: newLoc => (dispatch) => {
//     console.log('redirect...');
//   },
// });

export const UserIsAuthenticated = connectedRouterRedirect({
  wrapperDisplayName: 'UserIsAuthenticated',
  AuthenticatingComponent: () => (<div>hi</div>),
  allowRedirectBack: true,
  redirectPath: (state, ownProps) =>
    locationHelper.getRedirectQueryParam(ownProps) || '/login',
  authenticatingSelector: () =>
    false,
  authenticatedSelector: () =>
    true,
  redirectAction: newLoc => (dispatch) => {
    console.log('redirect...');
  },
});

// export const UserIsAuthenticated = connectedRouterRedirect({
//   // The url to redirect user to if they fail
//   redirectPath: '/login',
//   // If selector is true, wrapper will not redirect
//   // For example let's check that state contains user data
//   authenticatedSelector: (state) => {
//     console.log('auth state???', state, state.firebase, pathToJS(state.firebase, 'auth'));
//     return false;
//     // return (pathToJS(state.firebase, 'auth') !== null);
//   },
//   // A nice display name for this check
//   wrapperDisplayName: 'UserIsAuthenticated'
// });