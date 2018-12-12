import { createStore } from 'redux'
import {socketReducer} from '../src'

const store = createStore(socketReducer)

store.subscribe(()=>{
  const state = store.getState()
  console.log(state)
})

export default store
