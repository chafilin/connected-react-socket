import React from 'react'
import Context from './Context'

function withSocket (WrappedComponent) {
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
