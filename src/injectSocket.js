import React from "react"
import { SocketContext } from "./Context"

/**
 * Pass socket to component
 * @param {Object} WrappedComponent in which socket should be injected
 * @returns {Object} injected component
 */
function injectSocket(WrappedComponent) {
  /**
   * New component with socket object
   */
  return class injectSocket extends React.Component {
    render() {
      return (
        <SocketContext.Consumer>
          {socket => <WrappedComponent socket={socket} {...this.props} />}
        </SocketContext.Consumer>
      )
    }
  }
}

export default injectSocket
