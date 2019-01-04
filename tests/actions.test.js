import {
  handleSocketAction,
  emitMessage,
  SOCKET_ACTION,
  EMIT_MESSAGE,
} from "../src/actions"

describe("Actions", () => {
  it("handle socket action test", () => {
    const payload = {
      hello: "test",
    }
    const expectedAction = {
      type: SOCKET_ACTION,
      payload,
    }
    expect(handleSocketAction(payload)).toEqual(expectedAction)
  })

  it("emit message test", () => {
    const eventType = "send",
      message = ["hello", "test"]
    const expectedAction = {
      type: EMIT_MESSAGE,
      payload: {
        eventType,
        message,
      },
    }
    expect(emitMessage(eventType, "hello", "test")).toEqual(expectedAction)
  })
})
