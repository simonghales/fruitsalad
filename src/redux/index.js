import {createStore} from 'redux';
import sessionReducer from './reducers/session';

export const store = createStore(sessionReducer);