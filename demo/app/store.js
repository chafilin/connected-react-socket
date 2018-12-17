/* eslint-disable */
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { socketReducer, socketMiddleware } from "../../src";

const reducers = combineReducers({
  socket: socketReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(reducers);

export default store;
