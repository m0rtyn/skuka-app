import styles from "./activity.module.css"
import {
  FC,
  Suspense,
  cloneElement,
  lazy,
  useEffect,
  useMemo,
  useRef
} from "react"
import { Activity, BlockElement, Skeleton } from "features/activity-calendar"
import { Tooltip } from "react-tooltip"
import { BLACK, MILLIS_IN_DAY, MINS_IN_HOUR, WHITE } from "shared/constants"
import { DayData, Millisecond } from "shared/types"
import { getYear } from "date-fns"
import { useAppSelector } from "app/store"
import { addRangeEdges, mapDaysToActivity } from "../utils/add-range-edges"
import { selectFirstSessionDateByRange } from "../store/user-stats.selectors"

const ActivityCalendar = lazy(() => import("features/activity-calendar"))

const THEME = {
  dark: [WHITE, WHITE],
  light: [BLACK, BLACK]
}

interface Props {
  dayData: DayData[]
  loading: boolean
}
export const HeatCalendar: FC<Props> = ({ dayData, loading }) => {
  const activityCalRef = useRef<HTMLDivElement>(null)

  const darkMode = useAppSelector(state => state.settings.darkMode)
  const dateRange = useAppSelector(state => state.userStats.dateRange)
  const firstDateByRange = useAppSelector(selectFirstSessionDateByRange)

  const activityData: Activity[] = useMemo(() => {
    const activity = mapDaysToActivity(dayData)
    return addRangeEdges(activity, dateRange)
  }, [dayData])

  const activityAccCount = useMemo(
    () =>
      Math.round(
        activityData.reduce((acc, { count }) => acc + count, 0) / MINS_IN_HOUR
      ),
    [activityData]
  )

  useEffect(() => {
    addYearsToCalendar(activityCalRef.current, firstDateByRange)
    // addGradientToCalendar(activityCalRef.current)
    return () => {
      const gradientFill = document.getElementById("gradientFill")
      if (gradientFill) {
        gradientFill.remove()
      }
    }
  }, [activityCalRef.current, firstDateByRange])

  return (
    <div className={styles.calendarContainer}>
      <Suspense fallback={<Skeleton />}>
        <ActivityCalendar
          loading={loading || !activityData.length}
          colorScheme={darkMode ? "dark" : "light"}
          renderBlock={renderCalBlock}
          totalCount={activityAccCount}
          data={activityData}
          blockSize={16}
          theme={THEME}
          maxLevel={8}
          ref={activityCalRef}
          hideColorLegend
          hideTotalCount
        />
        <Tooltip id='react-tooltip' />
      </Suspense>
    </div>
  )
}

function renderCalBlock(block: BlockElement, activity: Activity) {
  const { level: lv, count, date } = activity
  const { x, y } = block.props
  const isLvZero = lv === 0
  const isDateBeforeNow = Date.now() - +new Date(date) >= MILLIS_IN_DAY
  const [size, offset, strokeWidth, radius] = getComputedStyle(lv)
  const stroke =
    isLvZero && isDateBeforeNow ? "var(--c-foreground)" : "var(--c-background)"
  const blockParams = {
    strokeDasharray: isLvZero && isDateBeforeNow ? "0.1,3" : "0",
    className: date.endsWith("01-01") ? "new-year" : "",
    style: {}, // NOTE: to rewrite default styles
    fill: !isLvZero ? "white" : "transparent",
    x: Number(x) + offset,
    y: Number(y) + offset,
    width: size,
    height: size,
    rx: radius,
    ry: radius,
    "data-tooltip-html": `${count} of session on ${date.slice(0, 10)}`,
    "data-tooltip-id": "react-tooltip",
    strokeLinecap: "round" as const,
    strokeWidth,
    stroke
  }

  return cloneElement(block, blockParams)
}

function addYearsToCalendar(
  activityCal: HTMLDivElement | null,
  firstDateByRange: Millisecond | null
) {
  if (!activityCal) return
  const legendDiv = activityCal.getElementsByClassName(
    "react-activity-calendar__legend-month"
  )[0]

  if (!legendDiv) return

  let year = firstDateByRange ? getYear(firstDateByRange) : null
  if (!year) return

  for (let i = 0; i < legendDiv.childNodes.length; i++) {
    const child = legendDiv.childNodes[i]

    if (child.textContent !== "Jan") continue

    child.textContent = `Janʼ${year.toString().slice(2, 4)}`
    year += 1
  }
}

function addGradientToCalendar(activityCal: HTMLDivElement | null): void {
  if (!activityCal) return

  const svgNS = "http://www.w3.org/2000/svg"
  const gradientFill = document.createElementNS(svgNS, "linearGradient")
  gradientFill.setAttribute("id", "gradientFill")

  const stop1 = document.createElementNS(svgNS, "stop")
  stop1.setAttribute("offset", "0%")
  stop1.setAttribute("stop-color", "#000")

  const stop2 = document.createElementNS(svgNS, "stop")
  stop2.setAttribute("offset", "100%")
  stop2.setAttribute("stop-color", "#fff")

  gradientFill.appendChild(stop1)
  gradientFill.appendChild(stop2)

  const svg = activityCal.querySelector("svg")
  if (!svg) return
  const defs =
    svg.querySelector("defs") || document.createElementNS(svgNS, "defs")
  defs.appendChild(gradientFill)
  svg?.appendChild(defs)
}

/** @returns {[number, number, number, number]} [size, offset, strokeWidth, radius] */
function getComputedStyle(lv: number): [number, number, number, number] {
  return (
    // [size, offset, strokeWidth, radius]
    // zero level: empty bordered circle
    lv === 0 ? [15, 0.5, 1, 8]
    : lv === 1 ? [10, 3, 6, 8]
    : lv === 2 ? [11, 2.5, 5, 7]
    : lv === 3 ? [12, 2, 4, 6]
    : lv === 4 ? [13, 1.5, 3, 5]
    : lv === 5 ? [14, 1, 2, 4]
    : lv === 6 ? [15, 0.5, 1, 3]
      // max level: full filled square
    : [16, 0, 0, 2]
  )
}
