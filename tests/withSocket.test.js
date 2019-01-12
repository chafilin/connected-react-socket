import withSocket from "../src/withSocket"
import Enzyme from "enzyme"
import Adapter from "enzyme-adapter-react-16"
import React from "react"
Enzyme.configure({ adapter: new Adapter() })

const { mount } = Enzyme

const mockContext = jest.fn()
jest.mock("../src/Context", () => ({
  Consumer: ({ children }) => children(mockContext()),
}))

/* eslint-disable  */
function SimpleComponent(props) {
  const { socketEvent, emit } = props
  return <div>{socketEvent}</div>
}
/* eslint-enable  */

describe("withSocket", () => {
  let emit
  let payload

  beforeEach(() => {
    emit = jest.fn()
    payload = ["message", "hello"]
    const context = {
      emit,
      payload,
    }
    mockContext.mockReturnValue(context)
  })
  it("should pass payload from context", () => {
    const WrappedComponend = withSocket(SimpleComponent)
    const wrapper = mount(<WrappedComponend />).find("SimpleComponent")
    expect(wrapper.prop("socketEvent")).toEqual(payload)
  })
  it("should pass emit from context", () => {
    const WrappedComponend = withSocket(SimpleComponent)
    const wrapper = mount(<WrappedComponend />).find("SimpleComponent")
    expect(wrapper.prop("emit")).toEqual(emit)
  })
})
