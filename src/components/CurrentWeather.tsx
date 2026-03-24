import { Wind, Compass } from "lucide-react"
import { Card } from "@/components/ui/card"

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
  const map: Record<number, { description: string; icon: string }> = {
    0: { description: "Clear sky", icon: "☀️" },
    1: { description: "Mainly clear", icon: "🌤️" },
    2: { description: "Partly cloudy", icon: "⛅" },
    3: { description: "Overcast", icon: "☁️" },
    45: { description: "Foggy", icon: "🌫️" },
    48: { description: "Depositing rime fog", icon: "🌫️" },
    51: { description: "Light drizzle", icon: "🌦️" },
    61: { description: "Slight rain", icon: "🌧️" },
    63: { description: "Moderate rain", icon: "🌧️" },
    65: { description: "Heavy rain", icon: "🌧️" },
    71: { description: "Slight snowfall", icon: "🌨️" },
    73: { description: "Moderate snowfall", icon: "🌨️" },
    75: { description: "Heavy snowfall", icon: "❄️" },
    95: { description: "Thunderstorm", icon: "⛈️" },
  }
  return map[code] ?? { description: "Unknown", icon: "🌡️" }
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
