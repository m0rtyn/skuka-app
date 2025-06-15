// // import { createChart, IChartApi, UTCTimestamp } from "lightweight-charts"
// import { useEffect, useRef } from "react"
// import { DAYS_IN_MONTH, MILLIS_IN_SECOND } from "shared/constants"
// import {
//   CHART_OPTIONS,
//   ACCUMULATED_SERIES_OPTIONS,
//   FORESIGHT_SERIES_OPTIONS,
//   SESSIONS_SERIES_OPTIONS
// } from "./constants"
// import { DayData, MockDayData } from "shared/types"

// // eslint-disable-next-line max-statements
// export const useChart = (
//   chartData: DayData[],
//   accumulatedDurations: DayData[],
//   foresightData: MockDayData[]
// ) => {
//   const chartRef = useRef<IChartApi | null>(null)
//   const chartContainerRef = useRef<HTMLDivElement | null>(null)

//   useEffect(() => {
//     const handleResize = () =>
//       chart.applyOptions({ width: chartContainerRef?.current?.clientWidth })

//     if (!chartContainerRef.current) return

//     const chart = createChart(chartContainerRef?.current, {
//       ...CHART_OPTIONS,
//       height: chartContainerRef?.current?.clientHeight,
//       // height: 340,
//       width: chartContainerRef?.current?.clientWidth,
//       autoSize: false
//     })
//     chartRef.current = chart

//     chart.timeScale().fitContent()
//     chart.timeScale().setVisibleLogicalRange({
//       from: chartData.length - DAYS_IN_MONTH,
//       to: chartData.length
//     })

//     const accumulatedSeries = chart.addAreaSeries(ACCUMULATED_SERIES_OPTIONS)
//     // TODO: remove temporal mapping
//     const mappedAccumulatedData = accumulatedDurations?.map((d, i) => ({
//       value: d.totalDuration,
//       time: (d.timestamp / MILLIS_IN_SECOND + i * 0.0001) as UTCTimestamp
//     }))

//     const foresightSeries = chart.addHistogramSeries(FORESIGHT_SERIES_OPTIONS)
//     // TODO: remove temporal mapping
//     const mappedForesightData = foresightData?.map((d, i) => ({
//       value: d.totalDuration,
//       time: (d.timestamp / MILLIS_IN_SECOND + i * 0.0001) as UTCTimestamp
//     }))

//     const realSeries = chart.addHistogramSeries(SESSIONS_SERIES_OPTIONS)
//     const mappedRealData =
//       chartData?.map((d, i) => ({
//         value: d.totalDuration,
//         time: (d.timestamp / MILLIS_IN_SECOND + i * 0.0001) as UTCTimestamp
//       })) ?? []

//     accumulatedSeries.setData(mappedAccumulatedData)
//     foresightSeries.setData(mappedForesightData ?? [])
//     realSeries.setData(mappedRealData)

//     window.addEventListener("resize", handleResize)

//     // NOTE: watermark
//     chart.applyOptions({
//       watermark: {
//         visible: true,
//         fontSize: 24,
//         horzAlign: "center",
//         vertAlign: "center",
//         color: "rgba(222, 222, 222, 0.1)",
//         text: "꩜Skuka"
//       }
//     })

//     return () => {
//       window.removeEventListener("resize", handleResize)
//       chart.remove()
//     }
//   }, [chartData])

//   return { chartRef, chartContainerRef }
// }
