import injectSocket from "../src/injectSocket"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
Enzyme.configure({ adapter: new Adapter() })

const { mount } = Enzyme

const mockContext = jest.fn()

jest.mock("../src/Context", () => ({
  SocketContext: { Consumer: ({ children }) => children(mockContext()) },
}))

/* eslint-disable  */
function SimpleComponent(props) {
  const { socket } = props
  return <div>{socket.id}</div>
}
/* eslint-enable  */

describe("withSocket", () => {
  it("should pass payload from context", () => {
    const socket = "Mocket socket"
    mockContext.mockReturnValue(socket)
    const WrappedComponend = injectSocket(SimpleComponent)
    const wrapper = mount(<WrappedComponend />).find("SimpleComponent")
    expect(wrapper.prop("socket")).toEqual(socket)
  })
})
