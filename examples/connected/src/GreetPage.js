import React, { Component } from "react";
import "./App.css";
import "nes.css/css/nes.min.css";
import { connect } from "react-redux";
import { emitMessage } from "connected-react-socket";
import { withRouter } from "react-router-dom";
import { SAVE_USER } from "./reducer";
class GreetPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: ""
    };
    this.setName = this.setName.bind(this);
    this.handleStartClick = this.handleStartClick.bind(this);
  }

  setName(e) {
    this.setState({ name: e.target.value });
  }

  handleStartClick() {
    const { sendName, saveName } = this.props;
    const { name } = this.state;
    if (name) {
      sendName(name);
      saveName(name);
    }
  }

  render() {
    const { type, history } = this.props;
    const { name } = this.state;
    if (type === "login") {
      history.push("/chat");
    }
    return (
      <div className="App">
        <header className="App-header">
          <div className="nes-field">
            <label htmlFor="name_field">Your name</label>
            <input
              type="text"
              id="name_field"
              className="nes-input"
              value={name}
              onChange={this.setName}
              onKeyPress={e => {
                if (e.key === "Enter") this.handleStartClick();
              }}
            />
            <button
              type="button"
              className="nes-btn is-success"
              onClick={this.handleStartClick}
            >
              Start
            </button>
          </div>
        </header>
      </div>
    );
  }
}

const mapDispatchToProp = dispatch => ({
  sendName: name => dispatch(emitMessage("add user", name)),
  saveName: name => dispatch({ type: SAVE_USER, payload: name })
});

export default withRouter(
  connect(
    state => ({ type: state.socket.type }),
    mapDispatchToProp
  )(GreetPage)
);
