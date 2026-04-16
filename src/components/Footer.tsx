export default function Footer() {
  return (
    <footer className="text-center py-4 sm:py-6 text-muted-foreground text-xs sm:text-sm">
      Powered by{" "}
      <a
        href="https://open-meteo.com/"
        target="_blank"
        rel="noopener noreferrer"
        className="text-primary hover:underline"
      >
        Open-Meteo
      </a>{" "}
      — Free Weather API
    </footer>
  )
}
