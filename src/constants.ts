export const API_BASE_URL = "https://api.open-meteo.com/v1/forecast"

export const DAILY_WEATHER_PARAMS = [
  "temperature_2m_max",
  "temperature_2m_min",
  "apparent_temperature_max",
  "apparent_temperature_min",
  "precipitation_sum",
  "rain_sum",
  "snowfall_sum",
  "precipitation_probability_max",
  "windspeed_10m_max",
  "windgusts_10m_max",
  "winddirection_10m_dominant",
  "uv_index_max",
  "weathercode",
  "sunrise",
  "sunset",
] as const

export const FORECAST_DAYS = 6

export const DATE_FORMAT_API = "yyyy-MM-dd"

export const DATE_FORMAT_SHORT_DAY = "EEE"
export const DATE_FORMAT_MONTH_DAY = "MMM d"
export const DATE_FORMAT_FULL_DAY = "EEE, MMM d"

export const LAT_MIN = -90
export const LAT_MAX = 90
export const LON_MIN = -180
export const LON_MAX = 180

export const WEATHER_CODE_MAP: Record<number, { description: string; icon: string }> = {
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

export const WEATHER_CODE_DEFAULT = { description: "Unknown", icon: "🌡️" }

export const CAPITAL_CITIES = [
  { label: "Singapore", lat: 1.3521, lon: 103.8198 },
  { label: "London", lat: 51.5074, lon: -0.1278 },
  { label: "Tokyo", lat: 35.6762, lon: 139.6503 },
  { label: "New Delhi", lat: 28.6139, lon: 77.209 },
  { label: "Paris", lat: 48.8566, lon: 2.3522 },
  { label: "New York", lat: 40.7128, lon: -74.006 },
  { label: "Sydney", lat: -33.8688, lon: 151.2093 },
  { label: "Dubai", lat: 25.2048, lon: 55.2708 },
  { label: "Berlin", lat: 52.52, lon: 13.405 },
  { label: "Beijing", lat: 39.9042, lon: 116.4074 },
  { label: "Seoul", lat: 37.5665, lon: 126.978 },
  { label: "Bangkok", lat: 13.7563, lon: 100.5018 },
  { label: "Cairo", lat: 30.0444, lon: 31.2357 },
  { label: "Toronto", lat: 43.6532, lon: -79.3832 },
  { label: "São Paulo", lat: -23.5505, lon: -46.6333 },
  { label: "Moscow", lat: 55.7558, lon: 37.6173 },
  { label: "Rome", lat: 41.9028, lon: 12.4964 },
  { label: "Istanbul", lat: 41.0082, lon: 28.9784 },
  { label: "Nairobi", lat: -1.2921, lon: 36.8219 },
  { label: "Mexico City", lat: 19.4326, lon: -99.1332 },
] as const

export const QUICK_PICK_COUNT = 5

export const UV_COLORS = ["#4ade80", "#a3e635", "#facc15", "#fb923c", "#ef4444", "#a855f7"] as const

export const UV_COLOR_THRESHOLDS = [2, 4, 6, 8, 10] as const
export const UV_LABEL_THRESHOLDS: { max: number; label: string }[] = [
  { max: 2, label: "Low" },
  { max: 5, label: "Moderate" },
  { max: 7, label: "High" },
  { max: 10, label: "Very High" },
]
export const UV_LABEL_EXTREME = "Extreme"

export const CHART_HEIGHT = 250
export const CHART_MARGIN = { top: 5, right: 20, left: 0, bottom: 5 } as const
export const CHART_TICK_FONT_SIZE = 12
export const CHART_GRID_STROKE = "#e2e8f0"

export const CHART_COLORS = {
  tempMax: "#ef4444",
  tempMin: "#3b82f6",
  rain: "#3b82f6",
  snow: "#a5b4fc",
  precipProbability: "#f59e0b",
  windSpeed: "#10b981",
  windGusts: "#f43f5e",
} as const

export const DASHBOARD_FEATURES = [
  { icon: "🌡️", label: "Temperature" },
  { icon: "🌧️", label: "Precipitation" },
  { icon: "💨", label: "Wind Speed" },
  { icon: "☀️", label: "UV Index" },
] as const
