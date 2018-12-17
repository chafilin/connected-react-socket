import React from "react";
import Context from "./Context";
import PropTypes from "prop-types";

/**
 * Socket provider for app
 */
class SocketProvider extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      payload: null,
    };
  }
  componentDidMount() {
    const { socket } = this.props;
    socket.onevent = msg => {
      const [type, ...data] = msg.data;
      const payload = {
        type,
        data,
      };
      this.setState({ payload });
    };
  }
  render() {
    const { children, socket } = this.props;
    const { payload } = this.state;
    return (
      <Context.Provider
        value={{ payload, emit: (type, ...rest) => socket.emit(type, ...rest) }}
      >
        {children}
      </Context.Provider>
    );
  }
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
  socket: PropTypes.object.isRequired,
};
export default SocketProvider;
