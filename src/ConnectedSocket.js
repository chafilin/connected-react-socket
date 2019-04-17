import React from "react"
import { connect } from "react-redux"
import { handleSocketAction } from "./actions"
import PropTypes from "prop-types"
import { SocketContext } from "./Context"

/**
 * Connected socket provider for app
 */
export class ConnectedSocket extends React.Component {
  componentDidMount() {
    const { socket, dispatch, shouldReconnect } = this.props
    if (shouldReconnect) {
      socket.open()
    }
    socket.onevent = ({data}) => {
      const payload = {
        [data[0]]:data.slice(1),
      }
      dispatch(handleSocketAction(payload))
    }
  }

  componentWillUnmount() {
    const { socket, shouldDisconnect } = this.props
    if (shouldDisconnect) {
      socket.close()
    }
  }
  render() {
    const { children, socket } = this.props
    return (
      <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
    )
  }
}

ConnectedSocket.propTypes = {
  children: PropTypes.node.isRequired,
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  shouldReconnect: PropTypes.bool,
  shouldDisconnect: PropTypes.bool,
}

ConnectedSocket.defaultProps = {
  shouldReconnect: false,
  shouldDisconnect: false,
}

export default connect()(ConnectedSocket)
