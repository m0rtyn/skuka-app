import { DayData } from "shared/types"
import { countMaxStreak, countStreak, getNewMaxStreak } from "./get-streak"
import { describe, it, expect } from "vitest"
import { startOfDay } from "date-fns"

const createDay = (date: Date, duration = 1000): DayData => ({
  timestamp: date.getTime(),
  totalDuration: duration,
  count: 1,
  sessions:
    duration > 0 ? [{ id: "1", duration, startedAt: date.getTime() }] : []
})

const today = startOfDay(new Date())
const yesterday = startOfDay(new Date(today.getTime() - 86400000))
const twoDaysAgo = startOfDay(new Date(today.getTime() - 2 * 86400000))
const threeDaysAgo = startOfDay(new Date(today.getTime() - 3 * 86400000))
const fourDaysAgo = startOfDay(new Date(today.getTime() - 4 * 86400000))

describe("countMaxStreak", () => {
  it("should return 0 for an empty array", () => {
    expect(countMaxStreak([])).toBe(0)
  })

  it("should throw an error if any days are empty", () => {
    const daysData: DayData[] = [
      createDay(today),
      {
        timestamp: yesterday.getTime(),
        totalDuration: 0,
        sessions: [],
        count: 0
      }
    ]
    expect(() => countMaxStreak(daysData)).toThrow(
      "Days with no sessions are not allowed"
    )
  })

  it("should return 1 for a single day", () => {
    const daysData = [createDay(today)]
    expect(countMaxStreak(daysData)).toBe(1)
  })

  it("should handle a simple consecutive streak", () => {
    const daysData = [createDay(twoDaysAgo), createDay(yesterday)]
    expect(countMaxStreak(daysData)).toBe(2)
  })

  it("should find the max streak when it's not at the end", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(today)
    ]
    expect(countMaxStreak(daysData)).toBe(2)
  })

  it("should find the max streak when multiple streaks exist", () => {
    const daysData = [
      createDay(new Date("2025-07-01T10:00:00Z")),
      createDay(new Date("2025-07-03T10:00:00Z")),
      createDay(new Date("2025-07-04T10:00:00Z")),
      createDay(new Date("2025-07-05T10:00:00Z"))
    ]
    expect(countMaxStreak(daysData)).toBe(3)
  })

  it("should handle multiple sessions on the same day", () => {
    const daysData = [
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(twoDaysAgo, 500), // another session on the same day
      createDay(yesterday)
    ]
    expect(countMaxStreak(daysData)).toBe(3)
  })
})

describe("countStreak", () => {
  it("should return 0 for an empty array", () => {
    expect(countStreak([])).toBe(0)
  })

  it("should return 1 for a single day", () => {
    const daysData = [createDay(today)]
    expect(countStreak(daysData)).toBe(1)
  })

  it("should return the current streak ending today", () => {
    const daysData = [
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(today)
    ]
    expect(countStreak(daysData)).toBe(3)
  })

  it("should return 1 if the streak was broken yesterday", () => {
    const daysData = [createDay(twoDaysAgo), createDay(today)]
    expect(countStreak(daysData)).toBe(1)
  })

  it("should return the current streak when there was a longer streak in the past", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(today)
    ]
    expect(countStreak(daysData)).toBe(1)
  })

  it("should handle multiple sessions on the same day for current streak", () => {
    const daysData = [
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(yesterday, 500),
      createDay(today)
    ]
    expect(countStreak(daysData)).toBe(3)
  })
})

describe("getNewMaxStreak", () => {
  it("should return the current max streak if the last day has no sessions", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(yesterday, 0)
    ]
    expect(getNewMaxStreak(daysData, 3, 3)).toBe(3)
  })

  it("should return a proper max streak if the last day has sessions, but current max streak is null", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(today)
    ]
    expect(getNewMaxStreak(daysData, null, null)).toBe(5)
  })

  it("should return the current max streak if the last day has sessions", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(today)
    ]
    expect(getNewMaxStreak(daysData, 4, 4)).toBe(5)
  })

  it("should return the current max streak if the last day has sessions and current max streak is NaN", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(today)
    ]
    expect(getNewMaxStreak(daysData, NaN, 4)).toBe(5)
  })

  it("should return the current max streak if the last day has sessions and current max streak is 0", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(today)
    ]
    expect(getNewMaxStreak(daysData, 0, 4)).toBe(5)
  })

  it("should return a proper max streak if the last day has sessions and current max streak is less than the streak", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(today)
    ]
    expect(getNewMaxStreak(daysData, 1, 4)).toBe(5)
  })

  it("should return the current max streak if the last day has sessions and current max streak is greater than the streak", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(today)
    ]
    expect(getNewMaxStreak(daysData, 6, 4)).toBe(7)
  })

  it("should return the current max streak if the last day has sessions and current max streak is equal to the streak", () => {
    const daysData = [
      createDay(fourDaysAgo),
      createDay(threeDaysAgo),
      createDay(twoDaysAgo),
      createDay(yesterday),
      createDay(today)
    ]
    expect(getNewMaxStreak(daysData, 5, 5)).toBe(6)
  })

  it("should return a proper max streak if sessions are rare", () => {
    const daysData = [
      createDay(new Date("2024-01-01T10:00:00Z")),
      createDay(new Date("2025-01-02T10:00:00Z")),
      createDay(new Date("2025-01-03T10:00:00Z")),
      createDay(today)
    ]
    expect(getNewMaxStreak(daysData, 2, 1)).toBe(2)
  })
})
