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
      //// 0, 1,  3,   5,   8,   13,  20,  30,   50,   80,   130
      //// 0, 60, 180, 300, 480, 780, 1200,1800, 3000, 4800, 7800
      /**/ 1, 31, 121, 244, 490, 980, 1199, 1799, 2999, 3901, 6888
    ] as Second[]
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

    // 1, 3, 5, 8, 13, 20
    expect.hasAssertions()
    expect(result1).toEqual({ seconds: 59, minutes: 0 })
    expect(result2).toEqual({ seconds: 59, minutes: 2 })
    expect(result3).toEqual({ seconds: 59, minutes: 4 })
    expect(result4).toEqual({ seconds: 59, minutes: 7 })
    expect(result5).toEqual({ seconds: 59, minutes: 12 })
  })
})
