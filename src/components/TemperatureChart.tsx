import { format, parseISO } from "date-fns"
import { Thermometer } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  AreaChart,
  Area,
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

interface DailyData {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
}

export default function TemperatureChart({ daily }: { daily: DailyData | null }) {
  if (!daily?.time?.length) return null

  const data = daily.time.map((date, i) => ({
    date: format(parseISO(date), DATE_FORMAT_SHORT_DAY),
    fullDate: format(parseISO(date), DATE_FORMAT_MONTH_DAY),
    max: daily.temperature_2m_max[i],
    min: daily.temperature_2m_min[i],
    feelsMax: daily.apparent_temperature_max[i],
    feelsMin: daily.apparent_temperature_min[i],
  }))

  return (
    <Card className="p-3 sm:p-5 animate-fade-in-up animate-stagger-1">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Thermometer className="h-7 w-7 sm:h-10 sm:w-10 text-red-500 animate-thermometer" />
        Temperature Trend
      </h3>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <AreaChart data={data} margin={CHART_MARGIN}>
          <defs>
            <linearGradient id="gradMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.tempMax} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS.tempMax} stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor={CHART_COLORS.tempMin} stopOpacity={0.3} />
              <stop offset="95%" stopColor={CHART_COLORS.tempMin} stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
          <XAxis dataKey="date" tick={{ fontSize: CHART_TICK_FONT_SIZE }} />
          <YAxis tick={{ fontSize: CHART_TICK_FONT_SIZE }} tickFormatter={(v) => `${v}°`} domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value, name) => {
              const labels: Record<string, string> = { max: "High", min: "Low", feelsMax: "Feels High", feelsMin: "Feels Low" }
              return [`${value}°C`, labels[name as string] || String(name)]
            }}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate || ""}
          />
          <Legend />
          <Area type="monotone" dataKey="max" name="High" stroke={CHART_COLORS.tempMax} fill="url(#gradMax)" strokeWidth={2} />
          <Area type="monotone" dataKey="min" name="Low" stroke={CHART_COLORS.tempMin} fill="url(#gradMin)" strokeWidth={2} />
          <Area type="monotone" dataKey="feelsMax" name="Feels High" stroke="#f97316" fill="none" strokeWidth={1.5} strokeDasharray="5 5" />
          <Area type="monotone" dataKey="feelsMin" name="Feels Low" stroke="#06b6d4" fill="none" strokeWidth={1.5} strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
