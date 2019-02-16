import React from "react"
import { MessageContext, SocketContext } from "./Context"
import PropTypes from "prop-types"

/**
 * Socket provider for app
 */
class SocketProvider extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      payload: null,
    }
  }
  componentDidMount() {
    const { socket, shouldReconnect } = this.props
    if (shouldReconnect) {
      socket.open()
    }
    socket.onevent = msg => {
      const [type, ...data] = msg.data
      const payload = {
        type,
        data,
      }
      this.setState({ payload })
    }
  }
  componentWillUnmount() {
    const { socket, shouldDisconnect } = this.props
    if (shouldDisconnect) {
      socket.close()
    }
    socket.close()
  }
  render() {
    const { children, socket } = this.props
    const { payload } = this.state
    return (
      <MessageContext.Provider
        value={{ payload, emit: (type, ...rest) => socket.emit(type, ...rest) }}
      >
        <SocketContext.Provider value={socket}>
          {children}
        </SocketContext.Provider>
      </MessageContext.Provider>
    )
  }
}

SocketProvider.propTypes = {
  children: PropTypes.node.isRequired,
  socket: PropTypes.object.isRequired,
  shouldReconnect: PropTypes.bool,
  shouldDisconnect: PropTypes.bool,
}

SocketProvider.defaultProps = {
  shouldReconnect: false,
  shouldDisconnect: false,
}

export default SocketProvider
