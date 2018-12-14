/***  examples/src/index.js ***/
/* eslint-disable */
import React from 'react'
import { render } from 'react-dom'
import { Provider as ReduxProvider,connect } from 'react-redux'

import { ConnectedSocket,withSocket } from '../../src'
import store  from './store'

import {socket} from'./socket'

const Display = (props) =>{
  const {socketEvent, name, emit} = props
  return (
  <div>
    <h2>Event from {name}:</h2>
    {socketEvent && socketEvent.type==='time' && (
      <div>Server timer is {socketEvent && socketEvent.data[0]} </div>
    )}
    {socketEvent && socketEvent.type==='id' && (
      <div>Your id is <b>{socketEvent && socketEvent.data[0]}</b> </div>
    )}
    <button onClick={()=>emit('reset',...socketEvent.data)}>Reset</button>
  </div>)
}

const mapStateToProps = state =>{
  return {
    socketEvent: state.socket
  }
}
const mapDispatchToProps = dispatch =>{
  return {
    emit: ()=>console.log('WIP')
  }
}

const ConnectedDisplay = connect(mapStateToProps, mapDispatchToProps)(Display)

const DisplayEvent = withSocket(Display)

const App = () => (
  <ReduxProvider store={store}>
    <ConnectedSocket socket={socket}>
      <h1>Demo page</h1>
      <DisplayEvent name="WithSocket"/>
      <ConnectedDisplay name="connect"/>
    </ConnectedSocket>
  </ReduxProvider>
)
render(<App />, document.getElementById("root"))
