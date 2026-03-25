import { Wind, Compass } from "lucide-react"
import { Card } from "@/components/ui/card"
import { WEATHER_CODE_MAP, WEATHER_CODE_DEFAULT } from "@/constants"

interface CurrentWeatherProps {
  data: {
    current_weather?: {
      temperature: number
      windspeed: number
      winddirection: number
      weathercode: number
    }
  } | null
}

function getWeatherDescription(code: number) {
  return WEATHER_CODE_MAP[code] ?? WEATHER_CODE_DEFAULT
}

export default function CurrentWeather({ data }: CurrentWeatherProps) {
  if (!data?.current_weather) return null

  const { current_weather: cw } = data
  const { description, icon } = getWeatherDescription(cw.weathercode)

  return (
    <Card className="overflow-hidden border-0 shadow-lg animate-fade-in-up">
      <div className="bg-gradient-to-br from-blue-500 via-blue-600 to-indigo-600 text-white p-3 sm:p-4">
        <div className="flex flex-col sm:flex-row items-center gap-3 sm:gap-4">
          <div className="text-3xl sm:text-4xl">{icon}</div>
          <div className="text-center sm:text-left">
            <p className="text-[9px] sm:text-[10px] uppercase tracking-widest opacity-80">Current Weather</p>
            <p className="text-2xl sm:text-3xl font-bold leading-tight">{cw.temperature}°C</p>
            <p className="text-sm opacity-90">{description}</p>
          </div>
          <div className="flex sm:flex-col gap-2 sm:ml-auto">
            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-xs">
              <Wind className="h-3.5 w-3.5" />
              <span>{cw.windspeed} km/h</span>
            </div>
            <div className="flex items-center gap-1.5 bg-white/15 rounded-lg px-3 py-1.5 text-xs">
              <Compass className="h-3.5 w-3.5" />
              <span>{cw.winddirection}°</span>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}

export { getWeatherDescription }
