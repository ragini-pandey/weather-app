import { useState } from "react"
import { format } from "date-fns"
import { Search, MapPin, Loader2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardDescription } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import {
  CAPITAL_CITIES,
  QUICK_PICK_COUNT,
  DATE_FORMAT_API,
  LAT_MIN,
  LAT_MAX,
  LON_MIN,
  LON_MAX,
} from "@/constants"

const today = format(new Date(), DATE_FORMAT_API)

interface SearchFormProps {
  onSearch: (params: { latitude: number; longitude: number; date: string }) => void
  loading: boolean
  compact?: boolean
}

export default function SearchForm({ onSearch, loading, compact = false }: SearchFormProps) {
  const [latitude, setLatitude] = useState("")
  const [longitude, setLongitude] = useState("")
  const [date, setDate] = useState(today)
  const [error, setError] = useState("")

  function validate() {
    const lat = parseFloat(latitude)
    const lon = parseFloat(longitude)
    if (isNaN(lat) || lat < LAT_MIN || lat > LAT_MAX)
      return `Latitude must be between ${LAT_MIN} and ${LAT_MAX}.`
    if (isNaN(lon) || lon < LON_MIN || lon > LON_MAX)
      return `Longitude must be between ${LON_MIN} and ${LON_MAX}.`
    if (!date) return "Please select a date."
    return ""
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    const msg = validate()
    if (msg) {
      setError(msg)
      return
    }
    setError("")
    onSearch({
      latitude: parseFloat(latitude),
      longitude: parseFloat(longitude),
      date,
    })
  }

  function handlePreset(loc: { lat: number; lon: number }) {
    setLatitude(String(loc.lat))
    setLongitude(String(loc.lon))
    setError("")
  }

  function handleCitySelect(e: React.ChangeEvent<HTMLSelectElement>) {
    const city = CAPITAL_CITIES.find((c) => c.label === e.target.value)
    if (city) handlePreset(city)
  }

  if (compact) {
    return (
      <form onSubmit={handleSubmit} className="grid grid-cols-2 sm:flex sm:flex-wrap sm:items-end gap-2 sm:gap-3">
        <div className="space-y-1 col-span-2 sm:w-48">
          <Label htmlFor="city-compact" className="text-xs">City</Label>
          <select
            id="city-compact"
            onChange={handleCitySelect}
            className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
          >
            <option value="">Select city…</option>
            {CAPITAL_CITIES.map((loc) => (
              <option key={loc.label} value={loc.label}>{loc.label}</option>
            ))}
          </select>
        </div>

        <div className="space-y-1 sm:w-auto">
          <Label htmlFor="lat-compact" className="text-xs">Lat</Label>
          <Input
            id="lat-compact"
            type="number"
            step="any"
            min={LAT_MIN}
            max={LAT_MAX}
            value={latitude}
            onChange={(e) => setLatitude(e.target.value)}
            required
            className="sm:w-24 h-9"
          />
        </div>
        <div className="space-y-1 sm:w-auto">
          <Label htmlFor="lon-compact" className="text-xs">Lon</Label>
          <Input
            id="lon-compact"
            type="number"
            step="any"
            min={LON_MIN}
            max={LON_MAX}
            value={longitude}
            onChange={(e) => setLongitude(e.target.value)}
            required
            className="sm:w-24 h-9"
          />
        </div>
        <div className="space-y-1 sm:w-auto">
          <Label htmlFor="date-compact" className="text-xs">Date</Label>
          <Input
            id="date-compact"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
            className="sm:w-36 h-9"
          />
        </div>
        <Button type="submit" size="sm" disabled={loading} className="self-end h-9">
          {loading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          <span className="ml-1.5">Search</span>
        </Button>
        {error && (
          <Alert variant="destructive" className="col-span-2 w-full">
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
      </form>
    )
  }

  return (
    <Card className="w-full max-w-xl shadow-xl border-0 backdrop-blur-sm bg-white/80">
      <CardHeader className="text-center pb-2">
        <CardDescription className="text-sm">Enter coordinates or pick a city to get started</CardDescription>
      </CardHeader>
      <CardContent className="space-y-5">
        <div className="flex flex-wrap justify-center gap-2">
          {CAPITAL_CITIES.slice(0, QUICK_PICK_COUNT).map((loc) => (
            <Badge
              key={loc.label}
              variant="outline"
              className="cursor-pointer hover:bg-primary hover:text-primary-foreground transition-all duration-200 px-3 py-1.5 hover:scale-105"
              onClick={() => handlePreset(loc)}
            >
              <MapPin className="h-3 w-3 mr-1" />
              {loc.label}
            </Badge>
          ))}
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div className="space-y-2">
              <Label htmlFor="latitude">Latitude</Label>
              <Input
                id="latitude"
                type="number"
                step="any"
                min={-90}
                max={90}
                placeholder="e.g. 40.7128"
                value={latitude}
                onChange={(e) => setLatitude(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="longitude">Longitude</Label>
              <Input
                id="longitude"
                type="number"
                step="any"
                min={-180}
                max={180}
                placeholder="e.g. -74.006"
                value={longitude}
                onChange={(e) => setLongitude(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                required
              />
            </div>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          <Button type="submit" className="w-full" size="lg" disabled={loading}>
            {loading ? (
              <Loader2 className="h-5 w-5 animate-spin mr-2" />
            ) : (
              <Search className="h-5 w-5 mr-2" />
            )}
            {loading ? "Fetching Weather…" : "Get Weather Forecast"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
