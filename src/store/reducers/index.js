import { combineReducers } from 'redux';
import todos from './todos';
import thunk from 'redux-thunk'  // redux异步中间件
import { createStore, applyMiddleware } from 'redux';

const todoApp = combineReducers({
  todos
});

const store = createStore(todoApp,applyMiddleware(thunk));

export default store;