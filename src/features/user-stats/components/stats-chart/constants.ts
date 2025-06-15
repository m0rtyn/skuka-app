import { format } from "date-fns"
import {
  ChartOptions,
  ColorType,
  HistogramSeriesPartialOptions,
  AreaSeriesPartialOptions
} from "lightweight-charts"
import { DeepPartial } from "redux"
import {
  BLACK,
  CYAN,
  DARK_GRAY,
  GRAY,
  LIGHT_GRAY,
  MILLIS_IN_QUARTER,
  YELLOW
} from "shared/constants"
import { SkukaChartData } from "shared/types"

const dateQuarterBefore = new Date(new Date().getTime() - MILLIS_IN_QUARTER)

export const PRIMARY_AXIS_CONFIG = {
  scaleType: "time",
  max: new Date(),
  min: dateQuarterBefore,
  formatters: {
    scale: (value: Date) => {
      if (!value) return value
      if (value.getMonth() === 0) return format(value, "yyyy")
      return format(value, "MMM")
    }
  },
  getValue: ({ primary }: SkukaChartData) => {
    // TODO: move date rounding to data source
    primary.setUTCHours(0)
    primary.setUTCMinutes(0)
    primary.setUTCSeconds(0)
    primary.setUTCMilliseconds(0)
    return primary
  }
}

export const CHART_OPTIONS: DeepPartial<ChartOptions> = {
  kineticScroll: {
    touch: false
  },
  trackingMode: {
    exitMode: 0
  },
  layout: {
    background: {
      type: ColorType.Solid,
      color: BLACK
    },
    textColor: LIGHT_GRAY
  },
  crosshair: {
    vertLine: {
      color: LIGHT_GRAY,
      style: 1
    },
    horzLine: {
      color: GRAY,
      style: 1
    },
    mode: 0
  },
  watermark: {
    text: "Skuka"
  },
  grid: {
    horzLines: { color: DARK_GRAY },
    vertLines: { visible: false }
  },
  leftPriceScale: {
    visible: true
    // alignLabels: true,
    // mode: 1
  },
  rightPriceScale: {
    visible: true
    // alignLabels: false,
    // entireTextOnly: false
  },
  handleScroll: {
    vertTouchDrag: false,
    horzTouchDrag: false,
    mouseWheel: true,
    pressedMouseMove: false
  },
  // autoSize: true,
  localization: {
    locale: "en-US",
    priceFormatter: val => {
      const formattedValue =
        val / 60 / 1000 >= 1 ? `${(val / 60 / 1000).toFixed(0)}k h`
        : val / 60 >= 1 ? `${(val / 60).toFixed(0)}h`
        : `${val.toFixed(0)}m`
      return formattedValue
    }
  }
}

export const SESSIONS_SERIES_OPTIONS: HistogramSeriesPartialOptions = {
  baseLineColor: GRAY,
  color: YELLOW,
  baseLineWidth: 2,
  priceLineVisible: false,
  lastValueVisible: false
} as const

export const FORESIGHT_SERIES_OPTIONS: HistogramSeriesPartialOptions = {
  baseLineColor: GRAY,
  baseLineWidth: 2,
  priceLineVisible: false,
  color: GRAY,
  baseLineVisible: false,
  lastValueVisible: false
} as const

export const ACCUMULATED_SERIES_OPTIONS: AreaSeriesPartialOptions = {
  topColor: CYAN,
  lineColor: CYAN,
  bottomColor: "transparent",
  lineWidth: 1,
  priceScaleId: "left",
  priceFormat: { type: "volume" }
} as const
