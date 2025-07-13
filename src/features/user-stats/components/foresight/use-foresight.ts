import { format, add } from "date-fns"
import { PRACTICE_HOURS_PROGRESSION } from "features/user-stats/user-stats.constants"
import { getMilestoneProgress } from "features/user-stats/utils/user-stats.utils"
import { useMemo } from "react"
import { MINS_IN_HOUR, MILLIS_IN_DAY } from "shared/constants"
import { Hour, Maybe, Minute } from "shared/types"
import {
  getFloorProgressionDiscrete,
  getNextProgressionStage
} from "shared/utils"

export const useForesight = (
  totalHours: Maybe<Hour>,
  average: Maybe<Minute>
) => {
  const currentHoursMilestone = useMemo(
    () =>
      totalHours !== null && totalHours > 0 ?
        getFloorProgressionDiscrete(totalHours, PRACTICE_HOURS_PROGRESSION)
      : null,
    [totalHours]
  )

  // const isStatsExist =
  //   currentHoursMilestone !== null && totalHours !== null && average !== null

  const nextHoursMilestone = useMemo(
    () =>
      currentHoursMilestone && totalHours ?
        getNextProgressionStage(
          currentHoursMilestone,
          totalHours,
          PRACTICE_HOURS_PROGRESSION
        )
      : null,
    [currentHoursMilestone, totalHours]
  )

  const milestoneProgress = useMemo(
    () =>
      nextHoursMilestone && totalHours ?
        getMilestoneProgress(nextHoursMilestone, totalHours)
      : null,
    [nextHoursMilestone, totalHours]
  )

  const averageHoursPerDay = useMemo(
    () => (average !== null ? ((average / MINS_IN_HOUR) as Hour) : null),
    [average]
  )

  const daysToNextMilestone = useMemo(
    () =>
      totalHours && nextHoursMilestone ?
        (nextHoursMilestone - totalHours) / (averageHoursPerDay || 1)
      : null,
    [nextHoursMilestone, totalHours, averageHoursPerDay]
  )

  const nextMilestoneDate =
    totalHours && daysToNextMilestone ?
      new Date(Date.now() + MILLIS_IN_DAY * daysToNextMilestone)
    : null
  const daysUntilNextMilestone =
    totalHours && nextMilestoneDate ?
      Math.floor((nextMilestoneDate.valueOf() - Date.now()) / MILLIS_IN_DAY)
    : null
  const dateOfNextMilestone =
    totalHours && daysUntilNextMilestone ?
      format(
        add(new Date(), { days: daysUntilNextMilestone }),
        "'at' dd MMM ‘yy"
      )
    : null

  const isForesightExist =
    currentHoursMilestone !== null &&
    nextHoursMilestone !== null &&
    milestoneProgress !== null &&
    averageHoursPerDay !== null &&
    daysToNextMilestone !== null &&
    nextMilestoneDate !== null &&
    daysUntilNextMilestone !== null &&
    dateOfNextMilestone !== null

  return {
    currentHoursMilestone,
    nextHoursMilestone,
    milestoneProgress,
    averageHoursPerDay,
    daysToNextMilestone,
    nextMilestoneDate,
    daysUntilNextMilestone,
    dateOfNextMilestone,
    // isStatsExist,
    isForesightExist
  }
}
