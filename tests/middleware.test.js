import configureStore from "redux-mock-store"
import socketMiddleware from "../src/middleware"

describe("Middleware", () => {
  it("shoild emit event on action", () => {
    const socket = {
      emit: jest.fn(),
    }
    const middlewares = [socketMiddleware(socket)]
    const mockStore = configureStore(middlewares)
    const initialState = {}
    const store = mockStore(initialState)
    store.dispatch({
      type: "@@socket/EMIT_MESSAGE",
      payload: {
        eventType: "message",
        message: "Hello,world",
      },
    })
    expect(socket.emit).toBeCalledWith("message", "Hello,world")
  })
  it("passes to next middleware if action type is not EMIT_MESSAGE", () => {
    const spy = jest.fn()
    /* eslint-disable require-jsdoc */
    const nextMiddleware = () => () => action => {
      spy(action)
    }
    const socket = {}
    const middlewares = [socketMiddleware(socket), nextMiddleware]
    const mockStore = configureStore(middlewares)
    const store = mockStore()
    const action = {
      type: "NOT_HANDLE_ACTION",
      payload: {
        text: "Hello",
      },
    }

    store.dispatch(action)
    expect(spy).toBeCalledWith(action)
  })
})
