import React from "react"
import Context from "./Context"

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
        <Context.Consumer>
          {({ payload, emit }) => (
            <WrappedComponent
              socketEvent={payload}
              emit={emit}
              {...this.props}
            />
          )}
        </Context.Consumer>
      )
    }
  }
}

export default withSocket
