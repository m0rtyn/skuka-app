import { render, unmountComponentAtNode } from "react-dom"
import { act } from "react-dom/test-utils"
import getRemainTime from "./get-remain-time"
import { EXPONENTIAL_STAGES } from "shared/constants"
import { describe, it, beforeEach, afterEach, expect } from "vitest"

// describe("Countdown", () => {
//   let container = null

//   beforeEach(() => {
//     // setup a DOM element as a render target
//     container = document.createElement("div")
//     document.body.appendChild(container)
//   })

//   afterEach(() => {
//     // cleanup on exiting
//     unmountComponentAtNode(container)
//     container.remove()
//     container = null
//   })

//   it("should display remain time in MM:SS format", () => {
//     act(() => {
//       render(<Countdown progress={300} />, container)
//     })

//     const value = container.textContent
//     expect(/\d\d:\d\d/.test(value)).toBe(true)
//   })

//   describe("when timer is started", () => {
//     it("should display remain time for less than 1 minute, but more than 0", () => {
//       act(() => {
//         render(<Countdown seconds={1} />, container)
//       })
//       expect(container.textContent).toBe("00:59")
//     })

//     it("should display remain time for less than 2 minute, but more than 1", () => {
//       act(() => {
//         render(<Countdown seconds={61} />, container)
//       })
//       expect(container.textContent).toBe("00:59")
//     })

//     it("should display remain time for less than 3 minutes, but more than 2", () => {
//       act(() => {
//         render(<Countdown seconds={121} />, container)
//       })
//       expect(container.textContent).toBe("00:59")
//     })

//     it("should display remain time for less than 5 minutes, but more than 3", () => {
//       act(() => {
//         render(<Countdown seconds={181} />, container)
//       })
//       expect(container.textContent).toBe("01:59")
//     })

//     it("should display remain time for less than 8 minutes, but more than 5", () => {
//       act(() => {
//         render(<Countdown seconds={301} />, container)
//       })
//       expect(container.textContent).toBe("02:59")
//     })

//     it("should display remain time for less than 13 minutes, but more than 8", () => {
//       act(() => {
//         render(<Countdown seconds={481} />, container)
//       })
//       expect(container.textContent).toBe("04:59")
//     })

//     it("should display remain time for less than 21 minutes, but more than 13", () => {
//       act(() => {
//         render(<Countdown seconds={781} />, container)
//       })
//       expect(container.textContent).toBe("07:59")
//     })

//     it("should display remain time for end of 13th minute (penultimate timer)", () => {
//       act(() => {
//         render(<Countdown seconds={780} />, container)
//       })
//       expect(container.textContent).toBe("08:00")
//     })

//     it("should display remain time for end of 21th minute (last timer)", () => {
//       act(() => {
//         render(<Countdown seconds={1260} />, container)
//       })
//       expect(container.textContent).toBe("13:00")
//     })

//     test("should display properlsy remain time on 11th minute", () => {
//       act(() => {
//         render(<Countdown seconds={659} />, container)
//       })

//       expect(container.textContent).toBe("02:01")
//     })

//     test("bug: should display properlsy remain time on 12th minute", () => {
//       act(() => {
//         render(<Countdown seconds={661} />, container)
//       })

//       expect(container.textContent).toBe("01:59")
//     })
//   })
// })

describe("getRemainTime", () => {
  it("should return 00:59 when 1 second is passed", () => {
    const result = getRemainTime(0, 1, EXPONENTIAL_STAGES)
    expect(result).toBe({ minutes: 0, seconds: 59 })
  })
  it("should return 00:01 when 59 seconds is passed", () => {
    const result = getRemainTime(0, 59, EXPONENTIAL_STAGES)
    expect(result).toBe({ minutes: 0, seconds: 1 })
  })
  it("should return 03:30 when 1 minute and 50 seconds is passed", () => {
    const result = getRemainTime(1, 30, EXPONENTIAL_STAGES)
    expect(result).toBe({ minutes: 3, seconds: 30 })
  })
})
