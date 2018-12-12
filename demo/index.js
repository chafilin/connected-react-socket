/***  examples/src/index.js ***/
import React from 'react'
import { render } from 'react-dom'
import { Provider as ReduxProvider } from 'react-redux'

import { Provider } from '../src'
import { store } from './store'

import {socket} from'./socket'

const App = () => (
  <ReduxProvider store={store}>
    <Provider socket={socket}>
      <div>Hello, world</div>
    </Provider>
  </ReduxProvider>
)
render(<App />, document.getElementById("root"))