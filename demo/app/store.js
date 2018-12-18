/* eslint-disable */
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import { socketReducer, socketMiddleware } from "../../src";
import { socket2 } from "./socket";

const reducers = combineReducers({
  socket: socketReducer,
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(socketMiddleware(socket2)))
);

export default store;
