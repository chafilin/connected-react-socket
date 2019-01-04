import socketReducer from "../src/reducer"
import { SOCKET_ACTION } from "../src/actions"

describe("Reducer", () => {
  it("socket reducer test init state", () => {
    expect(socketReducer(undefined, { type: "SomeType" })).toEqual({})
  })

  it("socket reducer test apply action", () => {
    const payload = {
      eventType: "auth",
    }
    const action = {
      type: SOCKET_ACTION,
      payload: payload,
    }
    expect(socketReducer({}, action)).toEqual(payload)
  })
})
