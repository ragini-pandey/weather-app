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
    date: format(parseISO(date), "EEE"),
    fullDate: format(parseISO(date), "MMM d"),
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
      <ResponsiveContainer width="100%" height={250}>
        <ComposedChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis yAxisId="left" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}mm`} />
          <YAxis yAxisId="right" orientation="right" tick={{ fontSize: 12 }} tickFormatter={(v) => `${v}%`} domain={[0, 100]} />
          <Tooltip
            formatter={(value, name) => {
              const labels: Record<string, string> = { rain: "Rain", snow: "Snow", probability: "Probability" }
              const unit = name === "probability" ? "%" : " mm"
              return [`${value}${unit}`, labels[name as string] || String(name)]
            }}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate || ""}
          />
          <Legend />
          <Bar yAxisId="left" dataKey="rain" name="Rain" fill="#3b82f6" radius={[4, 4, 0, 0]} />
          <Bar yAxisId="left" dataKey="snow" name="Snow" fill="#a5b4fc" radius={[4, 4, 0, 0]} />
          <Line yAxisId="right" type="monotone" dataKey="probability" name="Probability" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
        </ComposedChart>
      </ResponsiveContainer>
    </Card>
  )
}
