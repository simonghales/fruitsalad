import {combineReducers, createStore} from 'redux';
import sessionReducer, {SessionState} from './reducers/session/reducer';
import drawDuoReducer, {DrawDuoState} from './reducers/drawDuo/reducer';

export interface AppState {
  drawDuo: DrawDuoState,
  session: SessionState,
}

export const store = createStore(combineReducers({
  session: sessionReducer,
  drawDuo: drawDuoReducer,
}));