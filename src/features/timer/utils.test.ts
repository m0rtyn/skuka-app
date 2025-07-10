import { Minute, Second } from "shared/types"
import { describe, expect, it } from "vitest"
import { convertTimerProgressToCountdown, getDayRemainTime } from "./utils"

describe("features/timer/utils", () => {
  describe("getDayRemainTime", () => {
    it("should return the correct remaining time when todayPractice is empty", () => {
      const result = getDayRemainTime(300 as Second, 60 as Second, [])
      expect(result).toEqual({ minutes: 4, seconds: 0 })
    })

    it("should return the correct remaining time with todayPractice", () => {
      const result = getDayRemainTime(
        600 as Second,
        120 as Second,
        [2, 3] as Minute[]
      )
      // 600 - 120 - (5 * 60) = 600 - 120 - 300 = 180 seconds
      // minutes = 3, seconds = 0
      expect(result).toEqual({ minutes: 3, seconds: 0 })
    })

    it("should handle remaining seconds correctly", () => {
      const result = getDayRemainTime(
        350 as Second,
        30 as Second,
        [1] as Minute[]
      )
      // 350 - 30 - 60 = 260
      // minutes = 4, seconds = 20
      expect(result).toEqual({ minutes: 4, seconds: 20 })
    })
  })

  describe("convertTimerProgressToCountdown", () => {
    const progressionSecs = [0, 60, 120, 180, 300, 600] as Second[]

    it("should return correct countdown when there is no practice today", () => {
      const result = convertTimerProgressToCountdown(
        30 as Second,
        [],
        progressionSecs
      )
      // currentSeconds = 30. nextStage = 60.
      // getDayRemainTime(60, 30, []) => remaining = 30s. {m: 0, s: 30}
      // expect(result).toEqual({ minutes: 0, secondsRemain: 30 })
      expect(result).toEqual({ minutes: 0, secondsRemain: 30 })
    })

    it("should return correct countdown with practice today", () => {
      const result = convertTimerProgressToCountdown(
        60 as Second,
        [1] as Minute[],
        progressionSecs
      )
      // currentSeconds = 60 + 60 = 120. nextStage = 180.
      // getDayRemainTime(180, 60, [1]) => remaining = 180 - 60 - 60 = 60s. {m: 1, s: 0}
      expect(result).toEqual({ minutes: 1, secondsRemain: 0 })
    })

    it("should handle being exactly on a progression stage", () => {
      const result = convertTimerProgressToCountdown(
        120 as Second,
        [] as Minute[],
        progressionSecs
      )
      // currentSeconds = 120. nextStage = 180.
      // getDayRemainTime(180, 120, []) => remaining = 60s. {m: 1, s: 0}
      expect(result).toEqual({ minutes: 1, secondsRemain: 0 })
    })
  })
})
