import React from "react"
import { cn } from "@/lib/utils"

const InputGroup = ({ className, ...props }: React.ComponentProps<"div">) => (
  <div
    className={cn(
      "flex items-center rounded-md border border-[var(--border)] bg-[var(--bg)] focus-within:ring-2 focus-within:ring-[var(--accent)] focus-within:ring-offset-2",
      className
    )}
    {...props}
  />
)

const InputGroupPrefix = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    className={cn(
      "flex items-center px-3 text-sm text-[var(--text)] border-r border-[var(--border)] h-full",
      className
    )}
    {...props}
  />
)

const InputGroupSuffix = ({ className, ...props }: React.ComponentProps<"span">) => (
  <span
    className={cn(
      "flex items-center px-3 text-sm text-[var(--text)] border-l border-[var(--border)] h-full",
      className
    )}
    {...props}
  />
)

const InputGroupInput = ({ className, ...props }: React.ComponentProps<"input">) => (
  <input
    className={cn(
      "flex h-10 w-full bg-transparent px-3 py-2 text-sm text-[var(--text-h)] outline-none placeholder:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50",
      className
    )}
    {...props}
  />
)

export { InputGroup, InputGroupPrefix, InputGroupSuffix, InputGroupInput }
