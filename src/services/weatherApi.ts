import axios from "axios"

const BASE_URL = "https://api.open-meteo.com/v1/forecast"

export async function fetchWeather(
  latitude: number,
  longitude: number,
  startDate: string,
  endDate: string
) {
  const params = {
    latitude,
    longitude,
    start_date: startDate,
    end_date: endDate,
    daily: [
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
    ].join(","),
    current_weather: true,
    timezone: "auto",
  }

  const response = await axios.get(BASE_URL, { params })
  return response.data
}
