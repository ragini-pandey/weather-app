import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--accent)] focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-[var(--accent)] text-white hover:bg-[var(--accent)]/90",
        destructive:
          "bg-red-500 text-white hover:bg-red-500/90",
        outline:
          "border border-[var(--border)] bg-[var(--bg)] hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)]",
        secondary:
          "bg-[var(--border)] text-[var(--text-h)] hover:bg-[var(--border)]/80",
        ghost:
          "hover:bg-[var(--accent-bg)] hover:text-[var(--text-h)]",
        link:
          "text-[var(--accent)] underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-4 py-2",
        sm: "h-9 rounded-md px-3",
        lg: "h-11 rounded-md px-8",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({ className, variant, size, ...props }) {
  return (
    <button
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
