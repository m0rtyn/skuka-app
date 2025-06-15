import { DayData, Millisecond } from "shared/types"
import { countMaxStreak } from "./get-streak"

describe("getMaxStreak", () => {
  it("should return 0 for an empty array", () => {
    const daysData: DayData[] = []
    expect(countMaxStreak(daysData)).toBe(0)
  })

  it("should return 0 if all days are empty", () => {
    const daysData = [
      {
        timestamp: 1,
        totalDuration: 0,
        count: 0,
        sessions: []
      },
      {
        timestamp: 2,
        totalDuration: 0,
        count: 0,
        sessions: []
      },
      {
        timestamp: 3,
        totalDuration: 0,
        count: 0,
        sessions: []
      }
    ]
    expect(countMaxStreak(daysData as unknown as DayData[])).toBe(0)
  })

  it("should return the correct streak for a single streak", () => {
    const daysData = [
      {
        timestamp: 1,
        totalDuration: 1000,
        count: 1,
        sessions: []
      },
      {
        timestamp: 2,
        totalDuration: 2000,
        count: 2,
        sessions: []
      },
      {
        timestamp: 3,
        totalDuration: 0,
        count: 0,
        sessions: []
      }
    ]
    expect(countMaxStreak(daysData as unknown as DayData[])).toBe(2)
  })

  it("should return the correct streak for multiple streaks", () => {
    const daysData = [
      {
        timestamp: 1,
        totalDuration: 1000,
        count: 1,
        sessions: []
      },
      {
        timestamp: 2,
        totalDuration: 2000,
        count: 2,
        sessions: []
      },
      {
        timestamp: 3,
        totalDuration: 0,
        count: 0,
        sessions: []
      },
      {
        timestamp: 4,
        totalDuration: 1000,
        count: 1,
        sessions: []
      },
      {
        timestamp: 5,
        totalDuration: 2000,
        count: 2,
        sessions: []
      }
    ]
    expect(countMaxStreak(daysData as unknown as DayData[])).toBe(2)
  })

  it("should return the correct streak for multiple streaks with a longer streak at the end", () => {
    const daysData = [
      {
        timestamp: 1,
        totalDuration: 1000,
        count: 1,
        sessions: []
      },
      {
        timestamp: 2,
        totalDuration: 2000,
        count: 2,
        sessions: []
      },
      {
        timestamp: 3,
        totalDuration: 0,
        count: 0,
        sessions: []
      },
      {
        timestamp: 4,
        totalDuration: 1000,
        count: 1,
        sessions: []
      },
      {
        timestamp: 5,
        totalDuration: 2000,
        count: 2,
        sessions: []
      },
      {
        timestamp: 6,
        totalDuration: 2000,
        count: 2,
        sessions: []
      }
    ]
    expect(countMaxStreak(daysData as unknown as DayData[])).toBe(3)
  })
})
