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
    date: format(parseISO(date), "EEE"),
    fullDate: format(parseISO(date), "MMM d"),
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
      <ResponsiveContainer width="100%" height={250}>
        <AreaChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <defs>
            <linearGradient id="gradMax" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#ef4444" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#ef4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="gradMin" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
              <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}°`} domain={["auto", "auto"]} />
          <Tooltip
            formatter={(value, name) => {
              const labels: Record<string, string> = { max: "High", min: "Low", feelsMax: "Feels High", feelsMin: "Feels Low" }
              return [`${value}°C`, labels[name as string] || String(name)]
            }}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate || ""}
          />
          <Legend />
          <Area type="monotone" dataKey="max" name="High" stroke="#ef4444" fill="url(#gradMax)" strokeWidth={2} />
          <Area type="monotone" dataKey="min" name="Low" stroke="#3b82f6" fill="url(#gradMin)" strokeWidth={2} />
          <Area type="monotone" dataKey="feelsMax" name="Feels High" stroke="#f97316" fill="none" strokeWidth={1.5} strokeDasharray="5 5" />
          <Area type="monotone" dataKey="feelsMin" name="Feels Low" stroke="#06b6d4" fill="none" strokeWidth={1.5} strokeDasharray="5 5" />
        </AreaChart>
      </ResponsiveContainer>
    </Card>
  )
}
