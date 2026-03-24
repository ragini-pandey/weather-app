import SearchForm from "./components/SearchForm"

export default function App() {
  function handleSearch(params: { latitude: number; longitude: number; date: string }) {
    console.log("Search params:", params)
  }

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
        <SearchForm onSearch={handleSearch} loading={false} />
      </div>
    </div>
  )
}
