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
import {
  UV_COLORS,
  UV_COLOR_THRESHOLDS,
  UV_LABEL_THRESHOLDS,
  UV_LABEL_EXTREME,
  DATE_FORMAT_SHORT_DAY,
  DATE_FORMAT_MONTH_DAY,
  CHART_HEIGHT,
  CHART_MARGIN,
  CHART_TICK_FONT_SIZE,
  CHART_GRID_STROKE,
} from "@/constants"

function getUVColor(uv: number) {
  for (let i = 0; i < UV_COLOR_THRESHOLDS.length; i++) {
    if (uv <= UV_COLOR_THRESHOLDS[i]) return UV_COLORS[i]
  }
  return UV_COLORS[UV_COLORS.length - 1]
}

function getUVLabel(uv: number) {
  for (const t of UV_LABEL_THRESHOLDS) {
    if (uv <= t.max) return t.label
  }
  return UV_LABEL_EXTREME
}

interface DailyData {
  time: string[]
  uv_index_max: number[]
}

export default function UVIndexChart({ daily }: { daily: DailyData | null }) {
  if (!daily?.time?.length) return null

  const data = daily.time.map((date, i) => ({
    date: format(parseISO(date), DATE_FORMAT_SHORT_DAY),
    fullDate: format(parseISO(date), DATE_FORMAT_MONTH_DAY),
    uv: daily.uv_index_max[i],
  }))

  return (
    <Card className="p-3 sm:p-5 animate-fade-in-up animate-stagger-4">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4 flex items-center gap-2">
        <Sun className="h-7 w-7 sm:h-10 sm:w-10 text-amber-500 animate-glow" />
        UV Index
      </h3>
      <ResponsiveContainer width="100%" height={CHART_HEIGHT}>
        <BarChart data={data} margin={CHART_MARGIN}>
          <CartesianGrid strokeDasharray="3 3" stroke={CHART_GRID_STROKE} />
          <XAxis dataKey="date" tick={{ fontSize: CHART_TICK_FONT_SIZE }} />
          <YAxis tick={{ fontSize: CHART_TICK_FONT_SIZE }} domain={[0, "auto"]} />
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
