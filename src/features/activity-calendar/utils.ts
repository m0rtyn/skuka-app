import { getMonth } from "date-fns"
import {
  differenceInCalendarDays,
  eachDayOfInterval,
  endOfYear,
  formatISO,
  getDay,
  isValid,
  nextDay,
  parseISO,
  startOfYear,
  subWeeks
} from "date-fns"
import { NAMESPACE } from "./constants"
import type { Activity, DayIndex, Week } from "./types"
import type { Color, ColorScale, Theme, ThemeInput } from "./types"
import type { Props } from "./activity-calendar"
import { DEFAULT_MONTH_LABELS } from "./constants"
import type { DayName, WeekdayLabels } from "./types"

export function validateActivities(
  activities: Array<Activity>,
  maxLevel: number
) {
  if (activities.length === 0) {
    throw new Error("Activity data must not be empty.")
  }

  for (const { date, level, count } of activities) {
    if (!isValid(parseISO(date))) {
      throw new Error(
        `Activity date '${date}' is not a valid ISO 8601 date string.`
      )
    }

    if (count < 0) {
      throw new RangeError(
        `Activity count must not be negative, found ${count}.`
      )
    }

    if (level < 0 || level > maxLevel) {
      throw new RangeError(
        `Activity level ${level} for ${date} is out of range. It must be between 0 and ${maxLevel}.`
      )
    }
  }
}

export function groupByWeeks(
  activities: Array<Activity>,
  weekStart: DayIndex = 0 // 0 = Sunday
): Array<Week> {
  const normalizedActivities = fillHoles(activities)

  // Determine the first date of the calendar. If the first date is not the
  // passed weekday, the respective weekday one week earlier is used.
  const firstActivity = normalizedActivities[0] as Activity
  const firstDate = parseISO(firstActivity.date)
  const firstCalendarDate =
    getDay(firstDate) === weekStart ? firstDate : (
      subWeeks(nextDay(firstDate, weekStart), 1)
    )

  // To correctly group activities by week, it is necessary to left-pad the list
  // because the first date might not be set start weekday.
  const paddedActivities = [
    ...(Array(differenceInCalendarDays(firstDate, firstCalendarDate)).fill(
      undefined
    ) as Array<Activity>),
    ...normalizedActivities
  ]

  const numberOfWeeks = Math.ceil(paddedActivities.length / 7)

  // Finally, group activities by week
  return range(numberOfWeeks).map(weekIndex =>
    paddedActivities.slice(weekIndex * 7, weekIndex * 7 + 7)
  )
}

/**
 * The calendar expects a continuous sequence of days,
 * so fill gaps with empty activity data.
 */
function fillHoles(activities: Array<Activity>): Array<Activity> {
  const calendar = new Map<string, Activity>(activities.map(a => [a.date, a]))
  const firstActivity = activities[0] as Activity
  const lastActivity = activities[activities.length - 1] as Activity

  return eachDayOfInterval({
    start: parseISO(firstActivity.date),
    end: parseISO(lastActivity.date)
  }).map(day => {
    const date = formatISO(day, { representation: "date" })

    if (calendar.has(date)) {
      return calendar.get(date) as Activity
    }

    return {
      date,
      count: 0,
      level: 0
    }
  })
}

export function getClassName(name: string) {
  return `${NAMESPACE}__${name}`
}

export function generateEmptyData(): Array<Activity> {
  const year = new Date().getFullYear()
  const days = eachDayOfInterval({
    start: new Date(year, 0, 1),
    end: new Date(year, 11, 31)
  })

  return days.map(date => ({
    date: formatISO(date, { representation: "date" }),
    count: 0,
    level: 0
  }))
}

export function generateTestData(args: {
  interval?: { start: Date; end: Date }
  maxLevel?: number
}): Array<Activity> {
  const maxCount = 20
  const maxLevel = args.maxLevel ? Math.max(1, args.maxLevel) : 4
  const now = new Date()

  const days = eachDayOfInterval(
    args.interval ?? {
      start: startOfYear(now),
      end: endOfYear(now)
    }
  )

  return days.map(date => {
    // The random activity count is shifted by up to 80% towards zero.
    const c = Math.round(
      Math.random() * maxCount - Math.random() * (0.8 * maxCount)
    )
    const count = Math.max(0, c)
    const level = Math.ceil((count / maxCount) * maxLevel)

    return {
      date: formatISO(date, { representation: "date" }),
      count,
      level
    }
  })
}

export function range(n: number) {
  return [...Array(n).keys()]
}

type MonthLabel = {
  weekIndex: number
  label: string
}

export function getMonthLabels(
  weeks: Array<Week>,
  monthNames: Array<string> = DEFAULT_MONTH_LABELS
): Array<MonthLabel> {
  return weeks
    .reduce<Array<MonthLabel>>((labels, week, weekIndex) => {
      const firstActivity = week.find(activity => activity !== undefined)

      if (!firstActivity) {
        throw new Error(`Unexpected error: Week ${weekIndex + 1} is empty.`)
      }

      const month = monthNames[getMonth(parseISO(firstActivity.date))]

      if (!month) {
        const monthName = new Date(firstActivity.date).toLocaleString("en-US", {
          month: "short"
        })
        throw new Error(
          `Unexpected error: undefined month label for ${monthName}.`
        )
      }

      const prevLabel = labels[labels.length - 1]

      if (weekIndex === 0 || !prevLabel || prevLabel.label !== month) {
        return [...labels, { weekIndex, label: month }]
      }

      return labels
    }, [])
    .filter(({ weekIndex }, index, labels) => {
      // Labels should only be shown if there is "enough" space (data).
      // This is a naive implementation that does not take the block size,
      // font size, etc. into account.
      const minWeeks = 3

      // Skip the first month label if there is not enough space to the next one.
      if (index === 0) {
        return labels[1] && labels[1].weekIndex - weekIndex >= minWeeks
      }

      // Skip the last month label if there is not enough data in that month
      // to avoid overflowing the calendar on the right.
      if (index === labels.length - 1) {
        return weeks.slice(weekIndex).length >= minWeeks
      }

      return true
    })
}

export function maxWeekdayLabelWidth(
  labels: Array<string>,
  showWeekdayLabel: WeekdayLabels,
  fontSize: number
): number {
  if (labels.length !== 7) {
    throw new Error("Exactly 7 labels, one for each weekday must be passed.")
  }

  return labels.reduce(
    (maxWidth, label, index) =>
      showWeekdayLabel.byDayIndex(index as DayIndex) ?
        Math.max(maxWidth, Math.ceil(calcTextDimensions(label, fontSize).width))
      : maxWidth,
    0
  )
}

export function calcTextDimensions(text: string, fontSize: number) {
  if (typeof document === "undefined" || typeof window === "undefined") {
    return { width: 0, height: 0 }
  }

  if (fontSize < 1) {
    throw new RangeError("fontSize must be positive")
  }

  if (text.length === 0) {
    return { width: 0, height: 0 }
  }

  const namespace = "http://www.w3.org/2000/svg"
  const svg = document.createElementNS(namespace, "svg")

  svg.style.position = "absolute"
  svg.style.visibility = "hidden"
  svg.style.fontFamily = window.getComputedStyle(document.body).fontFamily
  svg.style.fontSize = `${fontSize}px`

  const textNode = document.createElementNS(namespace, "text")
  textNode.textContent = text

  svg.appendChild(textNode)
  document.body.appendChild(svg)
  const boundingBox = textNode.getBBox()

  document.body.removeChild(svg)

  return { width: boundingBox.width, height: boundingBox.height }
}

export function initWeekdayLabels(
  input: Props["showWeekdayLabels"],
  weekStart: DayIndex
): WeekdayLabels {
  if (!input)
    return {
      byDayIndex: () => false,
      shouldShow: false
    }

  // Default: Show every second day of the week.
  if (input === true) {
    return {
      byDayIndex: index => {
        return ((7 + index - weekStart) % 7) % 2 !== 0
      },
      shouldShow: true
    }
  }

  const indexed: Array<boolean> = []
  for (const name of input) {
    const index = dayNameToIndex[name.toLowerCase() as DayName]
    indexed[index] = true
  }

  return {
    byDayIndex: index => indexed[index] ?? false,
    shouldShow: input.length > 0
  }
}

const dayNameToIndex: Record<DayName, DayIndex> = {
  sun: 0,
  mon: 1,
  tue: 2,
  wed: 3,
  thu: 4,
  fri: 5,
  sat: 6
}

export function createTheme(input?: ThemeInput, steps = 5): Theme {
  const defaultTheme = createDefaultTheme(steps)

  if (input) {
    validateThemeInput(input, steps)

    input.light = input.light ?? defaultTheme.light
    input.dark = input.dark ?? defaultTheme.dark

    return {
      light:
        isPair(input.light) ? calcColorScale(input.light, steps) : input.light,
      dark: isPair(input.dark) ? calcColorScale(input.dark, steps) : input.dark
    }
  }

  return defaultTheme
}

function createDefaultTheme(steps: number): Theme {
  return {
    light: calcColorScale(["hsl(0, 0%, 92%)", "hsl(0, 0%, 26%)"], steps),
    dark: calcColorScale(["hsl(0, 0%, 22%)", "hsl(0, 0%, 92%)"], steps)
  }
}

function validateThemeInput(input: ThemeInput, steps: number) {
  const maxLevelHint =
    'The number of colors is controlled by the "maxLevel" property.'

  if (
    typeof input !== "object" ||
    (input.light === undefined && input.dark === undefined)
  ) {
    throw new Error(
      `The theme object must contain at least one of the fields "light" and "dark" with exactly 2 or ${steps} colors respectively. ${maxLevelHint}`
    )
  }

  if (input.light) {
    const { length } = input.light
    if (length !== 2 && length !== steps) {
      throw new Error(
        `theme.light must contain exactly 2 or ${steps} colors, ${length} passed. ${maxLevelHint}`
      )
    }

    for (const c of input.light) {
      if (typeof window !== "undefined" && !CSS.supports("color", c)) {
        throw new Error(
          `Invalid color "${String(c)}" passed. All CSS color formats are accepted.`
        )
      }
    }
  }

  if (input.dark) {
    const { length } = input.dark
    if (length !== 2 && length !== steps) {
      throw new Error(
        `theme.dark must contain exactly 2 or ${steps} colors, ${length} passed. ${maxLevelHint}`
      )
    }

    for (const c of input.dark) {
      if (typeof window !== "undefined" && !CSS.supports("color", c)) {
        throw new Error(
          `Invalid color "${String(c)}" passed. All CSS color formats are accepted.`
        )
      }
    }
  }
}

function calcColorScale(
  [start, end]: [Color, Color],
  steps: number
): ColorScale {
  return range(steps).map(i => {
    // In the loading animation the zero color is used.
    // However, Safari 16 crashes if a CSS color-mix expression like below is
    // combined with relative color syntax to calculate a hue variation for the
    // animation. Since the start and end colors do not need to be mixed, they
    // can be returned directly to work around this issue.
    switch (i) {
      case 0:
        return start
      case steps - 1:
        return end
      default: {
        const pos = (i / (steps - 1)) * 100
        return `color-mix(in oklab, ${end} ${parseFloat(pos.toFixed(2))}%, ${start})`
      }
    }
  })
}

function isPair<T>(val: Array<T>): val is [T, T] {
  return val.length === 2
}
