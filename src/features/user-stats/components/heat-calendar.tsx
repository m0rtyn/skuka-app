import styles from "./activity.module.css"
import { FC, cloneElement, useEffect, useMemo, useRef } from "react"
import ActivityCalendar, {
  Activity,
  BlockElement
} from "react-activity-calendar"
import { Tooltip } from "react-tooltip"
import { CYAN, DARK_GRAY, LIGHT_GRAY, MINS_IN_HOUR } from "shared/constants"
import { DayData, Millisecond } from "shared/types"
import { getYear } from "date-fns"
import { useAppSelector } from "app/store"
import { addRangeEdges, mapDaysToActivity } from "../utils/add-range-edges"
import { selectFirstSessionDateByRange } from "../store/user-stats.selectors"

const THEME = { dark: [DARK_GRAY, CYAN], light: [LIGHT_GRAY, DARK_GRAY] }

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
  }, [activityCalRef.current, firstDateByRange])

  const renderBlock = (block: BlockElement, activity: Activity) =>
    cloneElement(block, {
      style: {
        ...block.props.style
      },
      className: activity.date.endsWith("01-01") ? "new-year" : "",
      "data-tooltip-id": "react-tooltip",
      "data-tooltip-html": `${activity.count} of session on ${activity.date.slice(0, 10)}`
    })

  return (
    <div className={styles.calendarContainer}>
      <ActivityCalendar
        loading={loading || !activityData.length}
        colorScheme={darkMode ? "dark" : "light"}
        renderBlock={renderBlock}
        totalCount={activityAccCount}
        data={activityData}
        blockSize={16}
        theme={THEME}
        ref={activityCalRef}
        hideTotalCount
      />
      <Tooltip id='react-tooltip' />
    </div>
  )
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
