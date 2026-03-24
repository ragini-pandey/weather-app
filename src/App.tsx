import { useState } from "react"
import { format, addDays, parseISO } from "date-fns"
import { fetchWeather } from "./services/weatherApi"
import SearchForm from "./components/SearchForm"
import CurrentWeather from "./components/CurrentWeather"
import TemperatureChart from "./components/TemperatureChart"
import PrecipitationChart from "./components/PrecipitationChart"
import WindChart from "./components/WindChart"
import ErrorMessage from "./components/ErrorMessage"
import Loader from "./components/Loader"

interface WeatherData {
  timezone?: string
  current_weather?: {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
  }
  daily?: Record<string, unknown[]>
}

export default function App() {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [searchInfo, setSearchInfo] = useState<{ latitude: number; longitude: number; date: string } | null>(null)
  const [hasSearched, setHasSearched] = useState(false)

  async function handleSearch({ latitude, longitude, date }: { latitude: number; longitude: number; date: string }) {
    setLoading(true)
    setError("")
    setWeatherData(null)

    try {
      const startDate = date
      const endDate = format(addDays(parseISO(date), 6), "yyyy-MM-dd")
      const data = await fetchWeather(latitude, longitude, startDate, endDate)
      setWeatherData(data)
      setSearchInfo({ latitude, longitude, date })
      setHasSearched(true)
    } catch (err: unknown) {
      const message =
        (err instanceof Error ? err.message : null) ||
        "Failed to fetch weather data. Please try again."
      setError(message)
      setHasSearched(true)
    } finally {
      setLoading(false)
    }
  }

  if (!hasSearched && !loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-blue-50 via-white to-indigo-50 px-4">
        <div className="flex flex-col items-center w-full animate-fade-in-up">
          <div className="text-5xl sm:text-6xl mb-4">🌤️</div>
          <h1 className="text-2xl sm:text-4xl font-extrabold text-center mb-2 text-slate-800">
            Weather Dashboard
          </h1>
          <p className="text-center text-muted-foreground mb-8 max-w-md">
            Get detailed forecasts, interactive charts, and 7-day outlooks
            for any location worldwide.
          </p>
          <SearchForm onSearch={handleSearch} loading={loading} />
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="bg-card border-b shadow-sm sticky top-0 z-50 animate-slide-down">
        <div className="max-w-6xl mx-auto px-3 sm:px-4 py-2 sm:py-3">
          <div className="flex flex-wrap items-center gap-2 sm:gap-4 mb-2">
            <h2 className="text-base sm:text-lg font-bold whitespace-nowrap">
              🌤️ Weather Dashboard
            </h2>
            {searchInfo && (
              <p className="text-xs sm:text-sm text-muted-foreground truncate">
                📍 {searchInfo.latitude}, {searchInfo.longitude} — {weatherData?.timezone || ""}
              </p>
            )}
          </div>
          <SearchForm onSearch={handleSearch} loading={loading} compact />
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-3 sm:px-4 py-4 sm:py-8">
        {loading && <Loader />}
        <ErrorMessage message={error} />

        {weatherData && (
          <div className="space-y-6 page-enter">
            <CurrentWeather data={weatherData} />
            <TemperatureChart daily={weatherData.daily as never} />
            <PrecipitationChart daily={weatherData.daily as never} />
            <WindChart daily={weatherData.daily as never} />
          </div>
        )}
      </div>

      <footer className="text-center py-6 text-muted-foreground text-sm">
        Data provided by{" "}
        <a href="https://open-meteo.com/" target="_blank" rel="noopener noreferrer"
          className="text-primary hover:underline">Open-Meteo</a>{" "}— Free Weather API
      </footer>
    </div>
  )
}
