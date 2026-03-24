import { cn } from "@/lib/utils"

const Card = ({ className, ...props }) => (
  <div
    className={cn(
      "rounded-xl border border-[var(--border)] bg-[var(--bg)] text-[var(--text-h)] shadow-sm",
      className
    )}
    {...props}
  />
)

const CardHeader = ({ className, ...props }) => (
  <div
    className={cn("flex flex-col space-y-1.5 p-6", className)}
    {...props}
  />
)

const CardTitle = ({ className, ...props }) => (
  <h3
    className={cn("font-semibold leading-none tracking-tight", className)}
    {...props}
  />
)

const CardDescription = ({ className, ...props }) => (
  <p
    className={cn("text-sm text-[var(--text)]", className)}
    {...props}
  />
)

const CardContent = ({ className, ...props }) => (
  <div className={cn("p-6 pt-0", className)} {...props} />
)

const CardFooter = ({ className, ...props }) => (
  <div
    className={cn("flex items-center p-6 pt-0", className)}
    {...props}
  />
)

export { Card, CardHeader, CardFooter, CardTitle, CardDescription, CardContent }
