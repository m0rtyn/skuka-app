import type {
  DateString,
  DayData,
  Millisecond,
  Minute,
  SkukaSession
} from "shared/types"
import { describe, expect, it } from "vitest"
import { getMedianDayDuration } from "./user-stats.utils"

describe("getMedianDayDuration", () => {
  const createSession = (duration: number): SkukaSession => ({
    duration: duration as Minute,
    timestamp: "2023-01-01T00:00:00.000Z" as DateString,
    userId: "test-user"
  })

  const createDayData = (sessions: SkukaSession[]): DayData => ({
    timestamp: new Date("2023-01-01T00:00:00.000Z").getTime() as Millisecond,
    sessions,
    userId: "test-user",
    totalDuration: sessions.reduce((acc, s) => acc + s.duration, 0) as Minute,
    count: sessions.length
  })

  it("should return 0 for an empty array of DayData", () => {
    const daysData: DayData[] = []
    expect(getMedianDayDuration(daysData)).toBe(0)
  })

  it("should return the correct median for a mix of empty and non-empty days", () => {
    const daysData: DayData[] = [
      createDayData([]), // totalDuration: 0
      createDayData([]), // totalDuration: 0
      createDayData([createSession(10), createSession(20)]) // totalDuration: 30
    ]
    // sorted durations: [0, 0, 30], median is 0
    expect(getMedianDayDuration(daysData)).toBe(0)
  })

  it("should return the correct median for a rational durations", () => {
    const daysData: DayData[] = [
      createDayData([
        createSession(10.3),
        createSession(20.8),
        createSession(3.6),
        createSession(29.5),
        createSession(1.2)
      ]), // totalDuration: 65.4
      createDayData([
        createSession(10.3),
        createSession(0),
        createSession(29.5)
      ]) // totalDuration: 39.8
    ]
    // total durations: [65.4, 39.8]. Sorted: [39.8, 65.4]. Median is (39.8 + 65.4) / 2 = 52.6
    expect(getMedianDayDuration(daysData)).toBe(52.6)
  })

  it("should return 0 if there are no sessions", () => {
    const daysData: DayData[] = [
      createDayData([]),
      createDayData([]),
      createDayData([]),
      createDayData([])
    ]
    expect(getMedianDayDuration(daysData)).toBe(0)
  })

  it("should calculate the median correctly for an odd number of days", () => {
    const daysData: DayData[] = [
      createDayData([createSession(10), createSession(2), createSession(5)]), // totalDuration: 17
      createDayData([createSession(20), createSession(12), createSession(15)]), // totalDuration: 47
      createDayData([createSession(10), createSession(2), createSession(5)]) // totalDuration: 17
    ]
    // sorted durations: [17, 17, 47], median is 17
    expect(getMedianDayDuration(daysData)).toBe(17)
  })

  it("should calculate the median correctly for an even number of days", () => {
    const daysData: DayData[] = [
      createDayData([createSession(10), createSession(2), createSession(5)]), // totalDuration: 17
      createDayData([createSession(20), createSession(12), createSession(15)]) // totalDuration: 47
    ]
    // sorted durations: [17, 47], median is (17+47)/2 = 32
    expect(getMedianDayDuration(daysData)).toBe(32)
  })
})
