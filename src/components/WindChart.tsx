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

interface DailyData {
  time: string[]
  windspeed_10m_max: number[]
  windgusts_10m_max: number[]
  winddirection_10m_dominant: number[]
}

export default function WindChart({ daily }: { daily: DailyData | null }) {
  if (!daily?.time?.length) return null

  const data = daily.time.map((date, i) => ({
    date: format(parseISO(date), "EEE"),
    fullDate: format(parseISO(date), "MMM d"),
    speed: daily.windspeed_10m_max[i],
    gusts: daily.windgusts_10m_max[i],
  }))

  return (
    <Card className="p-3 sm:p-5 animate-fade-in-up animate-stagger-3">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Wind className="h-7 w-7 sm:h-10 sm:w-10 text-emerald-500 animate-breeze" />
        Wind Speed & Gusts
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <LineChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis
            tick={{ fontSize: 12 }}
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
          <Line type="monotone" dataKey="speed" name="Max Speed" stroke="#10b981" strokeWidth={2} dot={{ r: 4, fill: "#10b981" }} />
          <Line type="monotone" dataKey="gusts" name="Gusts" stroke="#f43f5e" strokeWidth={2} dot={{ r: 4, fill: "#f43f5e" }} strokeDasharray="5 5" />
        </LineChart>
      </ResponsiveContainer>
    </Card>
  )
}
