/***  examples/src/index.js ***/
import React from 'react'
import { render } from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { ConnectedSocket } from '../src'
import { store } from './store'

import {socket} from'./socket'
import withSocket from '../src/withSocket';

const Display = (props) =>{
  const {socketEvent} = props
  console.log(socketEvent)
  return <div>{socketEvent && socketEvent.type}</div>
}

const DisplayEvent = withSocket(Display)

const App = () => (
  <ReduxProvider store={store}>
    <ConnectedSocket socket={socket}>
      <DisplayEvent/>
    </ConnectedSocket>
  </ReduxProvider>
)
render(<App />, document.getElementById("root"))
