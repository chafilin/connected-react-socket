import React from "react"
import { MessageContext } from "./Context"

/**
 * Pass socket data and methods to component
 * @param {Object} WrappedComponent in which socket method should be injected
 * @returns {Object} injected component
 */
function withSocket(WrappedComponent) {
  /**
   * New component with socket methods
   */
  return class WithSocket extends React.Component {
    render() {
      return (
        <MessageContext.Consumer>
          {({ payload, emit }) => (
            <WrappedComponent
              socketEvent={payload}
              emit={emit}
              {...this.props}
            />
          )}
        </MessageContext.Consumer>
      )
    }
  }
}

export default withSocket
