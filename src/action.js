export const SOCKET_ACTION = '@@socket/SOCKET_ACTION'

/**
 * Action creator for saving socket data in store
 * @param {Object} payload object with data from socket
 * @returns {Object} created action
 */
export const handleSocketAction = (payload)=>({
  type: SOCKET_ACTION,
  payload,
})
