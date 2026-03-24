import { cva } from "class-variance-authority"
import { cn } from "@/lib/utils"

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-[var(--accent)] focus:ring-offset-2",
  {
    variants: {
      variant: {
        default:
          "border-transparent bg-[var(--accent)] text-white hover:bg-[var(--accent)]/80",
        secondary:
          "border-transparent bg-[var(--border)] text-[var(--text-h)] hover:bg-[var(--border)]/80",
        destructive:
          "border-transparent bg-red-500 text-white hover:bg-red-500/80",
        outline:
          "border-[var(--border)] text-[var(--text-h)]",
      },
    },
    defaultVariants: {
      variant: "default",
    },
  }
)

function Badge({ className, variant, ...props }) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  )
}

export { Badge, badgeVariants }
