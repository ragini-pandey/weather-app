import { format, parseISO } from "date-fns"
import { CloudRain } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Line,
  ComposedChart,
} from "recharts"
import {
  DATE_FORMAT_SHORT_DAY,
  DATE_FORMAT_MONTH_DAY,
  CHART_HEIGHT,
  CHART_MARGIN,
  CHART_TICK_FONT_SIZE,
  CHART_GRID_STROKE,
  CHART_COLORS,
} from "@/constants"

interface DailyData {
  time: string[]
  rain_sum: number[]
  snowfall_sum: number[]
  precipitation_sum: number[]
  precipitation_probability_max: number[]
}

export default function PrecipitationChart({ daily }: { daily: DailyData | null }) {
  if (!daily?.time?.length) return null

  const data = daily.time.map((date, i) => ({
    date: format(parseISO(date), DATE_FORMAT_SHORT_DAY),
    fullDate: format(parseISO(date), DATE_FORMAT_MONTH_DAY),
    rain: daily.rain_sum[i],
    snow: daily.snowfall_sum[i],
    total: daily.precipitation_sum[i],
    probability: daily.precipitation_probability_max[i],
  }))

  return (
    <Card className="p-3 sm:p-5 animate-fade-in-up animate-stagger-2">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <CloudRain className="h-7 w-7 sm:h-10 sm:w-10 text-blue-500 animate-rainfall" />
        Precipitation
      </h3>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <ComposedChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
          <XAxis dataKey="date" tick={{ fontSize: CHART_TICK_FONT_SIZE }} />
          <YAxis yAxisId="left" tick={{ fontSize: CHART_TICK_FONT_SIZE }} tickFormatter={(v) => `${v}mm`} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: CHART_TICK_FONT_SIZE }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
          <Tooltip
            formatter={(value, name) => {
              const labels: Record<string, string> = { rain: "Rain", snow: "Snow", probability: "Probability" }
              const unit = name === "probability" ? "%" : " mm"
              return [`${value}${unit}`, labels[name as string] || String(name)]
            }}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate || ""}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="rain" name="Rain" fill={CHART_COLORS.rain} radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="snow" name="Snow" fill={CHART_COLORS.snow} radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="probability" name="Probability" stroke={CHART_COLORS.precipProbability} strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}
