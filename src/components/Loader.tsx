import { Loader2 } from "lucide-react"

export default function Loader() {
  return (
    <div className="flex flex-col items-center justify-center py-16 gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-muted-foreground" />
      <p className="text-muted-foreground">Fetching weather data…</p>
    </div>
  )
}
