import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const alertVariants = cva(
  "relative w-full rounded-lg border p-4 [&>svg~*]:pl-7 [&>svg+div]:translate-y-[-3px] [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4",
  {
    variants: {
      variant: {
        default:
          "border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)]",
        destructive:
          "border-red-500/50 text-red-600 dark:border-red-500 [&>svg]:text-red-600",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

const Alert = ({ className, variant, ...props }) => (
  <div
    role="alert"
    className={cn(alertVariants({ variant }), className)}
    {...props}
  />
)

const AlertTitle = ({ className, ...props }) => (
  <h5
    className={cn("mb-1 font-medium leading-none tracking-tight", className)}
    {...props}
  />
)

const AlertDescription = ({ className, ...props }) => (
  <div
    className={cn("text-sm [&_p]:leading-relaxed", className)}
    {...props}
  />
)

export { Alert, AlertTitle, AlertDescription }
