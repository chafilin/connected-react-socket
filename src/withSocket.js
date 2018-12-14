import React from 'react'
import Context from './Context'

/**
 * Pass socket data and methods to component
 * @param {Object} WrappedComponent in which socket method should be injected
 * @returns {Object} injected component
 */
function withSocket (WrappedComponent) {
  /**
   * New component with socket methods
   */
  class WithSocket extends React.Component {
    render(){
      const {context} = this
      return <WrappedComponent socketEvent = {context} {...this.props}/>
    }
  }

  WithSocket.contextType = Context

  return WithSocket
}

export default withSocket
