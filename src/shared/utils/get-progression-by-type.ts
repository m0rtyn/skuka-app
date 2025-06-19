import { ProgressionType } from "features/settings/settings.types"
import {
  EXPONENTIAL_STAGES,
  FIBONACCI_STAGES,
  LINEAR_STAGE_RATIOS
} from "shared/constants"
import { getProgressionSecsByAverage } from "./get-progression-by-average"
import { Minute, Second } from "shared/types"

// eslint-disable-next-line complexity
export const getProgressionByType = (
  type?: ProgressionType,
  options?: { ratio?: number; average: Minute }
): Second[] => {
  const average = options?.average
  const ratio = options?.ratio

  switch (type) {
    case ProgressionType.Default:
      return EXPONENTIAL_STAGES
    case ProgressionType.Fibonacci:
      return FIBONACCI_STAGES
    case ProgressionType.Linear:
      return LINEAR_STAGE_RATIOS.map(num => (num * (ratio || 5)) as Second)
    case ProgressionType.ByAverage: {
      return getProgressionSecsByAverage(average ?? (1 as Minute))
    }
    default:
      // return LINEAR_STAGE_RATIOS.map(num => (num * 1) as Second)
      return getProgressionSecsByAverage(average ?? (1 as Minute))
  }
}
