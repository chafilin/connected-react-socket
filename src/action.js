export const SOCKET_ACTION = '@@socket/SOCKET_ACTION'

export const handleSocketAction = (payload)=>({
  type: SOCKET_ACTION,
  payload
})
