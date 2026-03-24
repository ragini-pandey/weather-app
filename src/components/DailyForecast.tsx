import { format, parseISO } from "date-fns"
import { Card } from "@/components/ui/card"
import { getWeatherDescription } from "./CurrentWeather"

interface DailyData {
  time: string[]
  weathercode: number[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  precipitation_sum: number[]
  windspeed_10m_max: number[]
  uv_index_max: number[]
}

export default function DailyForecast({ daily }: { daily: DailyData | null }) {
  if (!daily?.time?.length) return null

  return (
    <div className="animate-fade-in-up animate-stagger-3">
      <h3 className="text-base sm:text-lg font-bold mb-3 sm:mb-4">📅 7-Day Forecast</h3>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-7 gap-2 sm:gap-3">
        {daily.time.map((date, i) => {
          const { description, icon } = getWeatherDescription(daily.weathercode[i])
          return (
            <Card
              key={date}
              className="p-3 sm:p-4 text-center hover:-translate-y-1 hover:shadow-lg transition-all duration-200"
            >
              <p className="text-[10px] sm:text-xs font-semibold text-muted-foreground">
                {format(parseISO(date), "EEE, MMM d")}
              </p>
              <div className="text-2xl sm:text-4xl my-1.5 sm:my-2">{icon}</div>
              <p className="text-sm text-muted-foreground mb-2">{description}</p>
              <div className="flex justify-center gap-2 font-semibold text-sm">
                <span className="text-red-500">↑{daily.temperature_2m_max[i]}°</span>
                <span className="text-blue-500">↓{daily.temperature_2m_min[i]}°</span>
              </div>
              <div className="mt-2 space-y-0.5 text-xs text-slate-500">
                <div>🌧️ {daily.precipitation_sum[i]} mm</div>
                <div>💨 {daily.windspeed_10m_max[i]} km/h</div>
                <div>☀️ UV {daily.uv_index_max[i]}</div>
              </div>
            </Card>
          )
        })}
      </div>
    </div>
  )
}
