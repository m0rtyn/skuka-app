import { SECS_IN_MIN } from "shared/constants"
import { Minute, Second } from "shared/types"

const MAX_STAGES = 50

export const getProgressionSecsByAverage = (average: Minute): Second[] =>
  new Array(MAX_STAGES)
    .fill(null)
    .map((_, i) => ((i + 1) * average * SECS_IN_MIN) as Second)
    .map(n => (Math.round(n * 100) / 100) as Second)
