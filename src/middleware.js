import { EMIT_MESSAGE } from "./actions";


/**
 * Catch emit action for socket and prevent it from reaching reducer or latest middleware
 * @param {Object} store prevStore
 * @returns {Function} which handle next middleware
 */
const socketMiddleware = store => next => action => { // eslint-disable-line no-unused-vars
  if (action.type !== EMIT_MESSAGE) {
    return next(action)
  }
  const { payload: {
    eventType,
    message,
  }} = action
  console.log(eventType,message)
}


export default socketMiddleware
