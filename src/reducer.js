import { SOCKET_ACTION } from "./action";

const socketReducer = (state={}, {type, payload})=>{
  if ( type ===  SOCKET_ACTION){
    return Object.assign({}, state, payload)
  }
  return state
}

export default socketReducer
