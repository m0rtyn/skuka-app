import { EXPONENTIAL_STAGES } from "shared/constants"
import { getClosestProgressionDiscrete } from "."
import getRemainTime from "features/timer/components/countdown/get-remain-time"
import { describe, it, beforeEach, afterEach, expect } from "vitest"
import { Second } from "shared/types"

// describe("getFloorFibDiscrete", () => {
//   it("should return properly values", () => {
//     const outputToInputMap = {
//       0: 0.1,
//       1: 1.3,
//       2: 2.5,
//       3: 3,
//       8: 11,
//       13: 14,
//       34: 34,
//       55: 55,
//       89: 101
//     }
//     const inputValues = Object.values(outputToInputMap)
//     // eslint-disable-next-line max-nested-callbacks
//     const outputValues = Object.keys(outputToInputMap).map((v) => +v)
//     // eslint-disable-next-line max-nested-callbacks
//     const result = inputValues.map((n) => getFloorFibonacciDiscrete(n))
//     expect(result).toEqual(outputValues)
//   })
// })

describe("getClosestProgressionDiscrete", () => {
  it("should return properly values", () => {
    const inputValues = [
      1, 31, 99, 144, 250, 480, 700, 999, 2000, 3333, 5000, 8000
    ]
    // eslint-disable-next-line max-nested-callbacks
    const results = inputValues.map(n =>
      getClosestProgressionDiscrete(n as Second, EXPONENTIAL_STAGES)
    )

    expect(results).toEqual(EXPONENTIAL_STAGES)
  })
})

describe("getRemainTime", () => {
  // eslint-disable-next-line max-statements
  it("should return properly values", () => {
    const one = 1 as Second
    const result1 = getRemainTime(
      EXPONENTIAL_STAGES[1],
      one,
      EXPONENTIAL_STAGES
    )
    const result2 = getRemainTime(
      EXPONENTIAL_STAGES[2],
      one,
      EXPONENTIAL_STAGES
    )
    const result3 = getRemainTime(
      EXPONENTIAL_STAGES[3],
      one,
      EXPONENTIAL_STAGES
    )
    const result4 = getRemainTime(
      EXPONENTIAL_STAGES[4],
      one,
      EXPONENTIAL_STAGES
    )
    const result5 = getRemainTime(
      EXPONENTIAL_STAGES[5],
      one,
      EXPONENTIAL_STAGES
    )

    expect.hasAssertions()
    expect(result1).toBe({ seconds: 59, minutes: 0 })
    expect(result2).toBe({ seconds: 59, minutes: 0 })
    expect(result3).toBe({ seconds: 59, minutes: 0 })
    expect(result4).toBe({ seconds: 59, minutes: 0 })
    expect(result5).toBe({ seconds: 59, minutes: 0 })
  })
})
