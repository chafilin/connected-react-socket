import { EMIT_MESSAGE } from "./actions"

/**
 * Catch emit action for socket and prevent it from reaching reducer or latest middleware
 * @param {Object} socket socket connected with store
 * @returns {Function} which handle next middleware
 */
const socketMiddleware = socket => () => next => action => {
  if (action.type !== EMIT_MESSAGE) {
    return next(action)
  }
  const {
    payload: { eventType, message },
  } = action
  socket.emit(eventType, message)
}

export default socketMiddleware
