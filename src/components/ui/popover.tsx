import React from "react"
import { Popover as PopoverPrimitive } from "@base-ui/react/popover"
import { cn } from "@/lib/utils"

const Popover = PopoverPrimitive.Root
const PopoverTrigger = PopoverPrimitive.Trigger

const PopoverContent = ({ className, sideOffset = 4, ...props }: React.ComponentProps<typeof PopoverPrimitive.Popup> & { sideOffset?: number }) => (
  <PopoverPrimitive.Portal>
    <PopoverPrimitive.Positioner sideOffset={sideOffset}>
      <PopoverPrimitive.Popup
        className={cn(
          "z-50 w-72 rounded-md border border-[var(--border)] bg-[var(--bg)] p-4 text-[var(--text-h)] shadow-md outline-none",
          className
        )}
        {...props}
      />
    </PopoverPrimitive.Positioner>
  </PopoverPrimitive.Portal>
)

export { Popover, PopoverTrigger, PopoverContent }
