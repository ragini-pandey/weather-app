import axios from "axios"
import { API_BASE_URL, DAILY_WEATHER_PARAMS } from "@/constants"

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
    daily: DAILY_WEATHER_PARAMS.join(","),
    current_weather: true,
    timezone: "auto",
  }

  const response = await axios.get(API_BASE_URL, { params })
  return response.data
}
