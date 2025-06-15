import { IChartApi } from 'lightweight-charts'

export function getChartRangeParams(chartApi: IChartApi | null) {
  // eslint-disable-next-line max-lines
  const logRange = chartApi?.timeScale().getVisibleLogicalRange() ?? null

  if (!logRange) return [null, null, null]

  const from = logRange.from
  const to = logRange.to
  const increment = Math.round((to - from) / 5) // 20

  if (increment < 5) return [from, to, 5]

  return [from, to, increment]
}
