import React, { Component } from "react";
import { connect } from "react-redux";

import "./App.css";
import "./ChatPage.css";

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
    this.sendMessage = this.sendMessage.bind(this);
    this.messagesList = React.createRef();
    this.input = React.createRef();
  }

  setMessage(e) {
    this.setState({ message: e.target.value });
  }

  sendMessage() {
    const { sendMessage } = this.props;
    const { message } = this.state;
    if (message) {
      sendMessage(message);
      this.setState({ message: "" });
    }
  }

  componentDidMount() {
    this.input.focus();
  }

  componentDidUpdate() {
    this.scrollToBottom();
  }

  scrollToBottom() {
    const scrollHeight = this.messageList.scrollHeight;
    const height = this.messageList.clientHeight;
    const maxScrollTop = scrollHeight - height;
    this.messageList.scrollTop = maxScrollTop > 0 ? maxScrollTop : 0;
  }

  render() {
    const { socketEvent, currentUser } = this.props;
    const { message, messages } = this.state;
    if (socketEvent.type === "new message") {
      const lastMessage = socketEvent.data[0];
      if (messages.indexOf(lastMessage) === -1)
        this.setState({
          messages: [...messages, lastMessage]
        });
    }
    console.log(messages);
    if (socketEvent.type === "add user") {
      const lastMessage = {
        message: [
          `${socketEvent.data[0].username} joined! Online: ${
            socketEvent.data[0].amountOfUsers
          }`
        ]
      };
      if (!messages.find(item => item.message[0] === lastMessage.message[0]))
        this.setState({
          messages: [...messages, lastMessage]
        });
    }
    if (socketEvent.type === "remove user") {
      const lastMessage = {
        message: [
          `${socketEvent.data[0].username} left! Online: ${
            socketEvent.data[0].amountOfUsers
          }`
        ]
      };
      if (!messages.find(item => item.message[0] === lastMessage.message[0]))
        this.setState({
          messages: [...messages, lastMessage]
        });
    }
    return (
      <div className="page">
        <div className="container" ref={node => (this.messageList = node)}>
          <div className="messages">
            {messages.map(({ message, username }) => (
              <div
                className={
                  username && username[0] === currentUser
                    ? "message -right"
                    : "message -left"
                }
              >
                <div
                  className={
                    username && username[0] === currentUser
                      ? "nes-balloon from-right"
                      : "nes-balloon from-left"
                  }
                >
                  <div className="message-body">
                    {username && username[0] !== currentUser && (
                      <span className="username">{username[0]}:</span>
                    )}
                    {message[0]}
                  </div>
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
            ref={node => (this.input = node)}
            onKeyPress={e => {
              if (e.key === "Enter") this.sendMessage();
            }}
          />
          <button
            type="button"
            className="nes-btn is-success"
            onClick={this.sendMessage}
          >
            Send
          </button>
        </footer>
      </div>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  sendMessage: message => dispatch(emitMessage("new message", message))
});

const mapStateToProps = state => ({
  socketEvent: state.socket,
  currentUser: state.user.username
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChatPage);
