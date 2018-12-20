import socketReducer from '../src/reducer'
import { SOCKET_ACTION } from '../src/actions'

test("socket reducer test init state", ()=>{
  expect(socketReducer(undefined, {type: "SomeType"})).toEqual({})
})

test("socket reducer test apply action",()=>{
  const payload = {
    eventType: 'auth',
  }
  const action = {
    type: SOCKET_ACTION,
    payload: payload,
  }
  expect(socketReducer({}, action)).toEqual(payload)
})
