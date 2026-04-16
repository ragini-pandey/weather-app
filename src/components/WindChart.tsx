import { format, parseISO } from "date-fns"
import { Wind } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
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
import type { DailyData } from "@/types"

type WindChartData = Pick<DailyData, 'time' | 'windspeed_10m_max' | 'windgusts_10m_max' | 'winddirection_10m_dominant'>

export default function WindChart({ daily }: { daily: WindChartData | null }) {
  if (!daily?.time?.length) return null

  const data = daily.time.map((date, i) => ({
    date: format(parseISO(date), DATE_FORMAT_SHORT_DAY),
    fullDate: format(parseISO(date), DATE_FORMAT_MONTH_DAY),
    speed: daily.windspeed_10m_max[i],
    gusts: daily.windgusts_10m_max[i],
  }))

  return (
    <Card className="p-3 sm:p-5 animate-fade-in-up animate-stagger-3">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Wind className="h-7 w-7 sm:h-10 sm:w-10 text-emerald-500 animate-breeze" />
        Wind Speed & Gusts
      </h3>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <LineChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
          <XAxis dataKey="date" tick={{ fontSize: CHART_TICK_FONT_SIZE }} />
          <YAxis
            tick={{ fontSize: CHART_TICK_FONT_SIZE }}
            tickFormatter={(v) => `${v}`}
            label={{ value: "km/h", angle: -90, position: "insideLeft", style: { fontSize: 12 } }}
          />
          <Tooltip
            formatter={(value, name) => {
              const labels: Record<string, string> = { speed: "Max Speed", gusts: "Gusts" }
              return [`${value} km/h`, labels[name as string] || String(name)]
            }}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate || ""}
          />
          <Legend />
          <Line type="monotone" dataKey="speed" name="Max Speed" stroke={CHART_COLORS.windSpeed} strokeWidth={2} dot={{ r: 4, fill: CHART_COLORS.windSpeed }} />
          <Line type="monotone" dataKey="gusts" name="Gusts" stroke={CHART_COLORS.windGusts} strokeWidth={2} dot={{ r: 4, fill: CHART_COLORS.windGusts }} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
