import {combineReducers, createStore, compose} from 'redux';
import {reactReduxFirebase, firebaseReducer} from 'react-redux-firebase';
import firebase from 'firebase';
import sessionReducer, {initialSessionState, SessionState} from './reducers/session/reducer';
import drawDuoReducer, {DrawDuoState, initialDrawDuoState} from './reducers/drawDuo/reducer';
import {SessionModel} from '../games/DrawDuo/logic/models';

declare var process: any;

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
};

// react-redux-firebase config
const rrfConfig = {
  userProfile: 'users',
  // useFirestoreForProfile: true // Firestore for Profile instead of Realtime DB
};

// initialize firebase instance
firebase.initializeApp(firebaseConfig); // <- new to v2.*.*

// Add reduxReduxFirebase enhancer when making store creator
const createStoreWithFirebase = compose(
  reactReduxFirebase(firebase, rrfConfig), // firebase instance as first argument
)(createStore);

// Add Firebase to reducers
const rootReducer = combineReducers({
  firebase: firebaseReducer,
  session: sessionReducer,
  drawDuo: drawDuoReducer,
});

export interface AppState {
  drawDuo: DrawDuoState,
  session: SessionModel,
  firebase: {},
}

export const store = createStoreWithFirebase(rootReducer, {
  session: initialSessionState,
  drawDuo: initialDrawDuoState,
});