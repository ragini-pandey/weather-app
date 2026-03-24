import { format, parseISO } from "date-fns"
import { Sun } from "lucide-react"
import { Card } from "@/components/ui/card"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
} from "recharts"

const UV_COLORS = ["#4ade80", "#a3e635", "#facc15", "#fb923c", "#ef4444", "#a855f7"]

function getUVColor(uv: number) {
  if (uv <= 2) return UV_COLORS[0]
  if (uv <= 4) return UV_COLORS[1]
  if (uv <= 6) return UV_COLORS[2]
  if (uv <= 8) return UV_COLORS[3]
  if (uv <= 10) return UV_COLORS[4]
  return UV_COLORS[5]
}

function getUVLabel(uv: number) {
  if (uv <= 2) return "Low"
  if (uv <= 5) return "Moderate"
  if (uv <= 7) return "High"
  if (uv <= 10) return "Very High"
  return "Extreme"
}

interface DailyData {
  time: string[]
  uv_index_max: number[]
}

export default function UVIndexChart({ daily }: { daily: DailyData | null }) {
  if (!daily?.time?.length) return null

  const data = daily.time.map((date, i) => ({
    date: format(parseISO(date), "EEE"),
    fullDate: format(parseISO(date), "MMM d"),
    uv: daily.uv_index_max[i],
  }))

  return (
    <Card className="p-3 sm:p-5 animate-fade-in-up animate-stagger-4">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Sun className="h-7 w-7 sm:h-10 sm:w-10 text-amber-500 animate-glow" />
        UV Index
      </h3>
      <ResponsiveContainer width="100%" height={250}>
        <BarChart data={data} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
          <XAxis dataKey="date" tick={{ fontSize: 12 }} />
          <YAxis tick={{ fontSize: 12 }} domain={[0, "auto"]} />
          <Tooltip
            formatter={(value) => [`${value} (${getUVLabel(Number(value))})`, "UV Index"]}
            labelFormatter={(_, payload) => payload?.[0]?.payload?.fullDate || ""}
          />
          <Bar dataKey="uv" name="UV Index" radius={[6, 6, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={index} fill={getUVColor(entry.uv)} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
      <div className="flex flex-wrap justify-center gap-3 mt-3 text-xs">
        {[
          { label: "Low (0-2)", color: UV_COLORS[0] },
          { label: "Moderate (3-5)", color: UV_COLORS[2] },
          { label: "High (6-7)", color: UV_COLORS[3] },
          { label: "Very High (8-10)", color: UV_COLORS[4] },
          { label: "Extreme (11+)", color: UV_COLORS[5] },
        ].map((item) => (
          <div key={item.label} className="flex items-center gap-1">
            <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
            <span className="text-slate-500">{item.label}</span>
          </div>
        ))}
      </div>
    </Card>
  )
}
