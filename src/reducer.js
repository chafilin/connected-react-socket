import { SOCKET_ACTION } from "./actions";

/**
 * Socket reducer which keeps data from socket
 * @param {Object} state previous state
 * @param {Object} action which need to make with state
 * @returns {Object} new state
 */
const socketReducer = (state={}, {type, payload})=>{
  if (type ===  SOCKET_ACTION){
    return Object.assign({}, state, payload)
  }
  return state
}

export default socketReducer
