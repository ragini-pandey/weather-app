import { AlertCircle, Clock, ServerCrash, RefreshCw } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"

interface ErrorMessageProps {
  message: string
  errorCode?: number | null
  onRetry?: () => void
}

export default function ErrorMessage({ message, errorCode, onRetry }: ErrorMessageProps) {
  if (!message) return null

  if (errorCode === 429) {
    return (
      <Alert className="mb-6 border-yellow-400/50 text-yellow-700 dark:text-yellow-400 [&>svg]:text-yellow-600">
        <Clock className="h-4 w-4" />
        <AlertTitle>Rate Limit Reached</AlertTitle>
        <AlertDescription className="flex items-center justify-between gap-4">
          <span>{message}</span>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry} className="shrink-0 gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </Button>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  if (errorCode != null && errorCode >= 500) {
    return (
      <Alert className="mb-6 border-orange-400/50 text-orange-700 dark:text-orange-400 [&>svg]:text-orange-600">
        <ServerCrash className="h-4 w-4" />
        <AlertTitle>Server Error</AlertTitle>
        <AlertDescription className="flex items-center justify-between gap-4">
          <span>{message}</span>
          {onRetry && (
            <Button variant="outline" size="sm" onClick={onRetry} className="shrink-0 gap-1.5">
              <RefreshCw className="h-3.5 w-3.5" />
              Retry
            </Button>
          )}
        </AlertDescription>
      </Alert>
    )
  }

  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}

