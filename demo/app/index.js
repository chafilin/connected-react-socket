/***  examples/src/index.js ***/
/* eslint-disable */
import React from "react"
import { render } from "react-dom"
import { Provider as ReduxProvider, connect } from "react-redux"

import {
  ConnectedSocket,
  withSocket,
  SocketProvider,
  emitMessage,
  injectSocket,
} from "../../src"
import store from "./store"

import { socket1, socket2 } from "./socket"

const Display = props => {
  const { socketEvent, name, emit, socket } = props
  console.log(socket)
  return (
    <div>
      <h2>Event from {name}:</h2>
      {socketEvent && socketEvent.type === "time" && (
        <div>Server timer is {socketEvent && socketEvent.data.join(",")} </div>
      )}
      {socketEvent && socketEvent.type === "id" && (
        <div>
          Your id is <b>{socketEvent && socketEvent.data[0]}</b>
        </div>
      )}
      <button onClick={() => emit("reset")}>Reset</button>
    </div>
  )
}

const mapStateToProps = state => {
  return {
    socketEvent: state.socket,
  }
}
const mapDispatchToProps = dispatch => {
  return {
    emit: (type, ...message) => dispatch(emitMessage(type, message)),
  }
}

const ConnectedDisplay = injectSocket(
  connect(
    mapStateToProps,
    mapDispatchToProps
  )(Display)
)

const DisplayEvent = injectSocket(withSocket(Display))

const App = () => (
  <div>
    <SocketProvider socket={socket1}>
      <h1>Demo socket provider</h1>
      <DisplayEvent name="WithSocket" />
    </SocketProvider>
    <ReduxProvider store={store}>
      <ConnectedSocket socket={socket2}>
        <h1>Demo connected socket</h1>
        <ConnectedDisplay name="connect" />
      </ConnectedSocket>
    </ReduxProvider>
  </div>
)
render(<App />, document.getElementById("root"))
