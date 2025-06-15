// @ts-nocheck tests
/* eslint-disable max-nested-callbacks, max-lines, max-statements */
import { MILLIS_IN_DAY } from "shared/constants"
import {
  DayData,
  FirestoreRefPath,
  Millisecond,
  Minute,
  SkukaChartData
} from "shared/types"
import {
  exportToCSV,
  getAverageCountPerDay,
  getAverageSessionPerDay,
  getTotalDurationsAsAxisData
} from "./user-stats.utils"
import { startOfToday } from "date-fns"

describe("getAverageSessionPerDay", () => {
  it("should return Infinity if there are no days diff", () => {
    const firstSessionDate = startOfToday().getTime() as Millisecond
    const totalDuration = 100 as Minute

    expect(getAverageSessionPerDay(firstSessionDate, totalDuration)).toBe(
      Infinity
    )
  })

  it("should return the correct average duration per day", () => {
    const todayDate = new Date(Date.now()).setHours(0, 0, 0, 0)
    const firstSessionDateList = [
      todayDate - MILLIS_IN_DAY,
      todayDate - MILLIS_IN_DAY * 10,
      todayDate - MILLIS_IN_DAY * 100,
      todayDate - MILLIS_IN_DAY * 365
    ]
    const totalDurationList = [100, 1000, 10000, 36500]
    const expectedAverage = 100

    totalDurationList.map((totalDuration, index) =>
      expect(
        getAverageSessionPerDay(
          firstSessionDateList[index] as Millisecond,
          totalDuration as Minute
        )
      ).toBe(expectedAverage)
    )
  })
})

describe("getTotalDurationsAsAxisData", () => {
  it("should return the correct total duration as axis data", () => {
    const daysWithSessionsAsAxis: SkukaChartData[] = [
      { primary: new Date(Date.now()), secondary: 100 },
      { primary: new Date(Date.now()), secondary: 1000 },
      { primary: new Date(Date.now()), secondary: 10000 },
      { primary: new Date(Date.now()), secondary: 36500 }
    ]
    const expectedTotalDurationsAxisData: SkukaChartData[] = [
      { primary: new Date(Date.now()), secondary: 100 },
      { primary: new Date(Date.now()), secondary: 1000 },
      { primary: new Date(Date.now()), secondary: 10000 },
      { primary: new Date(Date.now()), secondary: 36500 }
    ]

    const result = daysWithSessionsAsAxis.reduce(
      (acc, data, i) => getTotalDurationsAsAxisData(acc, data, i),
      [] as SkukaChartData[]
    )

    expect(result).toEqual(expectedTotalDurationsAxisData)
  })
})
describe("getAverageCountPerDay", () => {
  const dayDataMock: DayData = {
    timestamp: 0 as Millisecond,
    totalDuration: 0,
    count: 0,
    sessions: [],
    userId: "test",
    statsRef: "/test" as FirestoreRefPath
  }
  const sessionMock = {
    duration: 0 as Minute,
    timestamp: "2023-01-01",
    userId: "test" as FirestoreRefPath
  }
  const dayDataList: DayData[] = [
    { ...dayDataMock, sessions: [sessionMock, sessionMock] },
    {
      ...dayDataMock,
      sessions: [sessionMock, sessionMock, sessionMock, sessionMock]
    },
    { ...dayDataMock, sessions: [] }
  ]

  it("should return the correct average count per day", () => {
    expect.hasAssertions()
    expect(getAverageCountPerDay(dayDataList)).toBe(2)
    expect(
      getAverageCountPerDay([...dayDataList, ...dayDataList, ...dayDataList])
    ).toBe(2)
    expect(
      getAverageCountPerDay([
        ...dayDataList,
        {
          ...dayDataMock,
          sessions: [
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock,
            sessionMock
          ]
        }
      ])
    ).toBe(4.5)
  })

  it("should return 0 if there are no days", () => {
    expect(getAverageCountPerDay([])).toBe(0)
  })

  it("should return 0 if there are no sessions", () => {
    expect(getAverageCountPerDay([{ ...dayDataMock, sessions: [] }])).toBe(0)
  })

  it("should return 0 if there are no days with sessions", () => {
    expect(
      getAverageCountPerDay([
        { ...dayDataMock, sessions: [] },
        { ...dayDataMock, sessions: [] }
      ])
    ).toBe(0)
  })
})

describe("exportToCsv", () => {
  const session = {
    duration: 10,
    timestamp: "2023-01-01",
    userId: "test"
  }
  const sessions = [session, session, session]
  const dayDataMock: DayData = {
    timestamp: 0,
    totalDuration: 0,
    count: 0,
    sessions: [],
    userId: "test",
    statsRef: "/test"
  }

  it("should return a csv string with empty session", () => {
    const recieved = exportToCSV([dayDataMock])
    const expected = [
      "data:text/csv;charset=utf-8,",
      "timestamp;totalDuration;count;sessions",
      "1970-01-01;0;0;"
    ].join("%0A")
    expect(recieved).toBe(expected)
  })

  it("should return a csv string with only one session", () => {
    const dayData = {
      ...dayDataMock,
      timestamp: new Date("2023-06-02").setHours(0, 0, 0, 0),
      sessions: [session]
    }
    const recieved = exportToCSV([dayData])
    const expected = [
      "data:text/csv;charset=utf-8,",
      "timestamp;totalDuration;count;sessions",
      "2023-06-01;10;1;10"
    ].join("%0A")
    expect(recieved).toBe(expected)
  })

  it("should return a csv string with only sessions array", () => {
    const dayData = {
      ...dayDataMock,
      timestamp: new Date("2023-06-02").setHours(0, 0, 0, 0),
      sessions
    }
    const recieved = exportToCSV([dayData])
    const expected = [
      "data:text/csv;charset=utf-8,",
      "timestamp;totalDuration;count;sessions",
      "2023-06-01;30;3;10,10,10"
    ].join("%0A")
    expect(recieved).toBe(expected)
  })

  it("should return a csv string with only count and totalDuration", () => {
    const dayData = {
      ...dayDataMock,
      timestamp: new Date("2023-06-02").setHours(0, 0, 0, 0),
      totalDuration: 30,
      count: 3
    }
    const recieved = exportToCSV([dayData])
    const expected = [
      "data:text/csv;charset=utf-8,",
      "timestamp;totalDuration;count;sessions",
      "2023-06-01;30;3;"
    ].join("%0A")
    expect(recieved).toBe(expected)
  })

  it("should return a csv string with only totalDuration", () => {
    const dayData = {
      ...dayDataMock,
      timestamp: new Date("2023-06-02").setHours(0, 0, 0, 0),
      totalDuration: 30
    }
    const recieved = exportToCSV([dayData])
    const expected = [
      "data:text/csv;charset=utf-8,",
      "timestamp;totalDuration;count;sessions",
      "2023-06-01;0;0;"
    ].join("%0A")
    expect(recieved).toBe(expected)
  })

  it("should return a csv string with only count", () => {
    const dayData = {
      ...dayDataMock,
      timestamp: new Date("2023-06-02").setHours(0, 0, 0, 0),
      count: 3
    }
    const recieved = exportToCSV([dayData])
    const expected = [
      "data:text/csv;charset=utf-8,",
      "timestamp;totalDuration;count;sessions",
      "2023-06-01;0;0;"
    ].join("%0A")
    expect(recieved).toBe(expected)
  })

  it("should return a csv string with only count and sessions", () => {
    const dayData = {
      ...dayDataMock,
      timestamp: new Date("2023-06-02").setHours(0, 0, 0, 0),
      count: 2,
      sessions
    }
    const recieved = exportToCSV([dayData])
    const expected = [
      "data:text/csv;charset=utf-8,",
      "timestamp;totalDuration;count;sessions",
      "2023-06-01;30;3;10,10,10"
    ].join("%0A")
    expect(recieved).toBe(expected)
  })

  it("should return a csv string with only totalDuration and sessions", () => {
    const dayData = {
      ...dayDataMock,
      timestamp: new Date("2023-06-02").setHours(0, 0, 0, 0),
      totalDuration: 30,
      sessions
    }
    const recieved = exportToCSV([dayData])
    const expected = [
      "data:text/csv;charset=utf-8,",
      "timestamp;totalDuration;count;sessions",
      "2023-06-01;30;3;10,10,10"
    ].join("%0A")
    expect(recieved).toBe(expected)
  })
})
