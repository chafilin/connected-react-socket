import React, { Component } from "react";
import "./App.css";
import "nes.css/css/nes.min.css";
import { Route, BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";
import { ConnectedSocket } from "connected-react-socket";
import GreetPage from "./GreetPage";
import ChatPage from "./ChatPage";

import store, { socket } from "./store";

class App extends Component {
  render() {
    return (
      <div className="App">
        <Provider store={store}>
          <ConnectedSocket socket={socket}>
            <BrowserRouter>
              <Switch>
                <Route path="/" exact component={GreetPage} />
                <Route path="/chat" component={ChatPage} />
              </Switch>
            </BrowserRouter>
          </ConnectedSocket>
        </Provider>
      </div>
    );
  }
}

export default App;
