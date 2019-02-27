import React from "react";
import "./App.css";
import "nes.css/css/nes.min.css";
import { Provider } from "react-redux";
import { ConnectedSocket } from "connected-react-socket";
import Router from "./Router";

import store, { socket } from "./store";
const App = () => {
  return (
    <div className="App">
      <Provider store={store}>
        <ConnectedSocket socket={socket}>
          <Router />
        </ConnectedSocket>
      </Provider>
    </div>
  );
};

export default App;
