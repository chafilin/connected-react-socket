import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
import SocketProvider from "../src/SocketProvider"

Enzyme.configure({ adapter: new Adapter() })
const { mount } = Enzyme

describe("Socket provider", () => {
  let props, wrapper
  beforeEach(() => {
    props = {
      socket: {
        close: jest.fn(),
      },
    }
    wrapper = mount(
      <SocketProvider {...props}>
        <div />
      </SocketProvider>
    )
  })
  it("should add listener on events", () => {
    expect(props.socket.onevent).toBeDefined()
  })

  it("should add set payload in state", () => {
    const message = {
      data: ["hello", "world"],
    }
    const payload = { type: "hello", data: ["world"] }
    props.socket.onevent(message)
    expect(wrapper.state("payload")).toEqual(payload)
  })

  it("should close on unmount", () => {
    wrapper.unmount()
    expect(props.socket.close).toBeCalled()
  })
})
