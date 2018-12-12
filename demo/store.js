import { createStore } from 'redux'

const simpleReducer =(state={},  action)=>{
  switch (action.type){
    default: return state
  }
}

export const store = createStore(simpleReducer)
