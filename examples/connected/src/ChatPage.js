import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import "nes.css/css/nes.min.css";
import { emitMessage } from "connected-react-socket";

class ChatPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      message: "",
      messages: []
    };
    this.setMessage = this.setMessage.bind(this);
  }

  setMessage(e) {
    this.setState({ message: e.target.value });
    const { setTyping } = this.props;
    setTyping();
  }

  render() {
    const { sendMessage, socketEvent, currentUser } = this.props;
    const { message, messages } = this.state;
    if (socketEvent.type === "new message") {
      const lastMessage = socketEvent.data[0];
      if (messages.indexOf(lastMessage) === -1)
        this.setState({
          messages: [...messages, lastMessage]
        });
    }
    return (
      <div className="page">
        <div className="container">
          <div className="messages">
            {messages.map(({ message, username }) => (
              <div
                className={
                  username && username[0] !== currentUser
                    ? "message -left"
                    : "message -right"
                }
              >
                <div
                  className={
                    username && username[0] !== currentUser
                      ? "nes-balloon from-left"
                      : "nes-balloon from-right"
                  }
                >
                  <p>{message[0]}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <footer>
          <input
            className="nes-input"
            value={message}
            onChange={this.setMessage}
          />
          <button
            type="button"
            className="nes-btn is-success"
            onClick={() => sendMessage(message)}
          >
            Send
          </button>
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(emitMessage("new message", message)),
  setTyping: () => dispatch(emitMessage("typing"))
});

const mapStateToProps = state => ({
  socketEvent: state.socket,
  currentUser: state.user.username
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
