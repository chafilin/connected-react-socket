export const SOCKET_ACTION = "@@socket/SOCKET_ACTION";
export const EMIT_MESSAGE = "@@socket/EMIT_MESSAGE";

/**
 * Action creator for saving socket data in store
 * @param {Object} payload object with data from socket
 * @returns {Object} created action
 */
export const handleSocketAction = payload => ({
  type: SOCKET_ACTION,
  payload,
});

/**
 * Action creator for sending to store message to emit
 * @param {String} eventType type of event message
 * @param {Array} message rest params that will be send as body
 * @returns {Object} created action
 */
export const emitMessage = (eventType, ...message) => ({
  type: EMIT_MESSAGE,
  payload: {
    eventType,
    message,
  },
});
