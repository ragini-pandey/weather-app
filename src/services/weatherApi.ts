import axios from "axios"
import { API_BASE_URL, DAILY_WEATHER_PARAMS } from "@/constants"

const ERROR_MESSAGES: Record<number, string> = {
  400: "Invalid request. Please check the location or date parameters.",
  429: "Too many requests. Please wait a moment before trying again.",
}

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

  try {
    const response = await axios.get(API_BASE_URL, { params })
    return response.data
  } catch (err: unknown) {
    if (axios.isAxiosError(err) && err.response) {
      const status = err.response.status
      const message =
        ERROR_MESSAGES[status] ??
        (status >= 500
          ? "Weather service is currently unavailable. Please try again later."
          : undefined)
      if (message) {
        const error = new Error(message);
        (error as Error & { status: number }).status = status
        throw error
      }
    }
    throw err
  }
}
