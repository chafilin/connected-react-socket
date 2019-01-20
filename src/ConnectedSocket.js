import React from "react"
import { connect } from "react-redux"
import { handleSocketAction } from "./actions"
import PropTypes from "prop-types"

/**
 * Connected socket provider for app
 */
export class ConnectedSocket extends React.Component {
  componentDidMount() {
    const { socket, dispatch } = this.props
    socket.onevent = msg => {
      const [type, ...data] = msg.data
      const payload = {
        type,
        data,
      }
      dispatch(handleSocketAction(payload))
    }
  }

  componentWillUnmount() {
    const { socket } = this.props
    socket.close()
  }
  render() {
    const { children } = this.props
    return <React.Fragment>{children}</React.Fragment>
  }
}

ConnectedSocket.propTypes = {
  children: PropTypes.node.isRequired,
  socket: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
}
export default connect()(ConnectedSocket)
