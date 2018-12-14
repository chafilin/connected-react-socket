/* eslint-disable */
import { createStore,combineReducers } from 'redux'
import { socketReducer } from '../src'

const reducers = combineReducers({
  socket: socketReducer,
})

const store = createStore(reducers,window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__())

export default store
