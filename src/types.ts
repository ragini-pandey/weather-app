export interface DailyData {
  time: string[]
  temperature_2m_max: number[]
  temperature_2m_min: number[]
  apparent_temperature_max: number[]
  apparent_temperature_min: number[]
  rain_sum: number[]
  snowfall_sum: number[]
  precipitation_sum: number[]
  precipitation_probability_max: number[]
  windspeed_10m_max: number[]
  windgusts_10m_max: number[]
  winddirection_10m_dominant: number[]
  uv_index_max: number[]
  weathercode: number[]
}

export interface WeatherData {
  timezone?: string
  current_weather?: {
    temperature: number
    windspeed: number
    winddirection: number
    weathercode: number
  }
  daily?: DailyData
}
