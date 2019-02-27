import { Route, BrowserRouter, Switch, Redirect } from "react-router-dom";
import React from "react";
import { connect } from "react-redux";
import GreetPage from "./GreetPage";
import ChatPage from "./ChatPage";

const Router = ({ currentUser }) => (
  <BrowserRouter>
    <Switch>
      <Route path="/" exact component={GreetPage} />
      {currentUser ? (
        <Route path="/chat" component={ChatPage} />
      ) : (
        <Redirect to="/" />
      )}
    </Switch>
  </BrowserRouter>
);

export default connect(state => ({ currentUser: state.user.username }))(Router);
