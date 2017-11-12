import {combineReducers, createStore} from 'redux';
import sessionReducer, {initialSessionState, SessionState} from './reducers/session/reducer';
import drawDuoReducer, {DrawDuoState, initialDrawDuoState} from './reducers/drawDuo/reducer';

export interface AppState {
  drawDuo: DrawDuoState,
  session: SessionState,
}

export const store = createStore(combineReducers({
  session: sessionReducer,
  drawDuo: drawDuoReducer,
}, {
  session: initialSessionState,
  drawDuo: initialDrawDuoState,
}));