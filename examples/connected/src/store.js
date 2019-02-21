/* eslint-disable */
import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import io from "socket.io-client";
import { socketReducer, socketMiddleware } from "connected-react-socket";

import reducer from "./reducer";
export const socket = io();

socket.on("connect", () => {
  console.log("Connect");
});

const reducers = combineReducers({
  socket: socketReducer,
  user: reducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  reducers,
  composeEnhancer(applyMiddleware(socketMiddleware(socket)))
);

export default store;
