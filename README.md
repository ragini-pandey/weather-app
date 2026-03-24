# Weather Dashboard

A modern weather forecast dashboard built with React, TypeScript, and Vite. Get detailed 7-day forecasts, interactive charts, and real-time weather data for any location worldwide.

**Live Demo:** [weather-app-ragini.vercel.app](https://weather-app-ragini.vercel.app/)

## Features

- **Current Weather** — Real-time temperature, wind speed, wind direction, and weather conditions
- **Temperature Trend** — Area chart showing daily high/low and feels-like temperatures
- **Precipitation** — Composed chart with rain, snow, and precipitation probability
- **Wind Speed & Gusts** — Line chart tracking max wind speed and gusts over 7 days
- **UV Index** — Color-coded bar chart with severity levels (Low to Extreme)
- **7-Day Forecast** — Daily weather cards with icons, temperatures, and key metrics
- **City Presets** — Quick-pick from 20 major world capitals
- **Responsive Design** — Optimized for mobile, tablet, and desktop

## Tech Stack

- **React 19** + **TypeScript**
- **Vite 8** — Fast build tooling
- **Tailwind CSS 4** — Utility-first styling with shadcn theme
- **Recharts** — Interactive charts (Area, Composed, Line, Bar)
- **Axios** — HTTP client for API requests
- **date-fns** — Date formatting and manipulation
- **lucide-react** — Icon library
- **shadcn/ui** — UI components (Card, Button, Input, Badge, Alert, Dialog, Select, etc.)

## API

Weather data is provided by [Open-Meteo](https://open-meteo.com/) — a free, open-source weather API. No API key required.

**Endpoint:** `https://api.open-meteo.com/v1/forecast`

**Data fetched:**
- Current weather (temperature, wind, weather code)
- Daily: temperature max/min, apparent temperature, precipitation, rain, snowfall, wind speed/gusts, wind direction, UV index, weather code, sunrise/sunset

## Getting Started

### Prerequisites

- **Node.js** ≥ 18
- **npm** ≥ 9

### Installation

```bash
# Clone the repository
git clone https://github.com/ragini-pandey/weather-app.git

# Navigate into the project
cd weather-app

# Install dependencies
npm install
```

### Running Locally

```bash
# Start the development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build & Preview

```bash
# Build for production
npm run build

# Preview the production build locally
npm run preview
```

### Usage

1. Enter latitude, longitude, start date, and end date — or pick a city from the presets.
2. Click **Search** to fetch weather data.
3. Explore current conditions, temperature trends, precipitation, wind, UV index, and the 7-day forecast.

## Project Structure

```
src/
├── App.tsx                     # Main app with landing + dashboard views
├── index.css                   # Tailwind theme, animations, global styles
├── main.tsx                    # Entry point
├── services/
│   └── weatherApi.ts           # Open-Meteo API client
├── components/
│   ├── SearchForm.tsx          # Search form with city presets + coordinate inputs
│   ├── CurrentWeather.tsx      # Current weather banner
│   ├── TemperatureChart.tsx    # Temperature trend area chart
│   ├── PrecipitationChart.tsx  # Precipitation composed chart
│   ├── WindChart.tsx           # Wind speed line chart
│   ├── UVIndexChart.tsx        # UV index bar chart
│   ├── DailyForecast.tsx       # 7-day forecast cards
│   ├── ErrorMessage.tsx        # Error alert
│   ├── Loader.tsx              # Loading spinner
│   └── ui/                     # shadcn UI primitives
└── lib/
    └── utils.ts                # Tailwind class merge utility
```

## License

ISC
