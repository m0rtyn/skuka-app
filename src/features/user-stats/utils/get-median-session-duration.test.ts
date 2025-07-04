import type {
  DateString,
  DayData,
  Millisecond,
  Minute,
  SkukaSession
} from "shared/types"
import { describe, expect, it } from "vitest"
import { getMedianSessionDuration } from "./user-stats.utils"

describe("getMedianSessionDuration", () => {
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
    expect(getMedianSessionDuration(daysData)).toBe(0)
  })

  it("should return the correct median for a mix of empty and non-empty days", () => {
    const daysData: DayData[] = [
      createDayData([]),
      createDayData([]),
      createDayData([createSession(10), createSession(20)])
    ]
    expect(getMedianSessionDuration(daysData)).toBe(5)
  })

  it("should return the correct median for a rational durations", () => {
    const daysData: DayData[] = [
      createDayData([
        createSession(10.3),
        createSession(20.8),
        createSession(3.6),
        createSession(29.5),
        createSession(1.2)
      ]),
      createDayData([
        createSession(10.3),
        createSession(0),
        createSession(29.5)
      ])
    ]
    // Sorted durations: [0, 1.2, 3.6, 10.3, 20.8, 29.5]. Median is 10.3.
    expect(getMedianSessionDuration(daysData)).toBe(10.3)
  })

  it("should return 0 if there are no sessions", () => {
    const daysData: DayData[] = [createDayData([])]
    expect(getMedianSessionDuration(daysData)).toBe(0)
  })

  it("should calculate the median correctly for an odd number of sessions", () => {
    const daysData: DayData[] = [
      createDayData([createSession(10), createSession(2), createSession(5)])
    ]
    // Sorted durations: [2, 5, 10]. Median is 5.
    expect(getMedianSessionDuration(daysData)).toBe(5)
  })

  it("should calculate the median correctly for an even number of sessions", () => {
    const daysData: DayData[] = [
      createDayData([
        createSession(10),
        createSession(2),
        createSession(8),
        createSession(4)
      ])
    ]
    // Sorted durations: [2, 4, 8, 10]. Median is (4 + 8) / 2 = 6.
    expect(getMedianSessionDuration(daysData)).toBe(6)
  })

  it("should calculate the median correctly across multiple days", () => {
    const daysData: DayData[] = [
      createDayData([createSession(10), createSession(2)]),
      createDayData([createSession(8), createSession(4), createSession(12)])
    ]
    // Sorted durations: [2, 4, 8, 10, 12]. Median is 8.
    expect(getMedianSessionDuration(daysData)).toBe(8)
  })

  it("should handle a single session", () => {
    const daysData: DayData[] = [createDayData([createSession(15)])]
    expect(getMedianSessionDuration(daysData)).toBe(15)
  })

  it("should handle sessions with zero duration", () => {
    const daysData: DayData[] = [
      createDayData([createSession(10), createSession(0), createSession(5)])
    ]
    // Sorted durations: [0, 5, 10]. Median is 5.
    expect(getMedianSessionDuration(daysData)).toBe(5)
  })
})
