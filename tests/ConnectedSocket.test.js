import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
import { ConnectedSocket } from "../src/ConnectedSocket"
import { handleSocketAction } from "../src/actions"

Enzyme.configure({ adapter: new Adapter() })
const { mount } = Enzyme

jest.mock("../src/actions")

describe("Connected socket", () => {
  let props, wrapper
  beforeEach(() => {
    props = {
      socket: {
        close: jest.fn(),
      },
      dispatch: () => {},
    }
    wrapper = mount(
      <ConnectedSocket {...props}>
        <div />
      </ConnectedSocket>
    )
  })
  it("should add listener on events", () => {
    expect(props.socket.onevent).toBeDefined()
  })
  it("should call action on message recieve", () => {
    const message = {
      data: ["hello", "world"],
    }
    const payload = { type: "hello", data: ["world"] }
    props.socket.onevent(message)
    expect(handleSocketAction).toBeCalledWith(payload)
  })
  it("should close on unmount", () => {
    wrapper.unmount()
    expect(props.socket.close).toBeCalled()
  })
})
