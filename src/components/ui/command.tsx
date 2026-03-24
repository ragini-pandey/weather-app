import { Command as CommandPrimitive } from "cmdk"
import { Search } from "lucide-react"
import { cn } from "@/lib/utils"

const Command = ({ className, ...props }) => (
  <CommandPrimitive
    className={cn(
      "flex h-full w-full flex-col overflow-hidden rounded-md bg-[var(--bg)] text-[var(--text-h)]",
      className
    )}
    {...props}
  />
)

const CommandInput = ({ className, ...props }) => (
  <div className="flex items-center border-b border-[var(--border)] px-3">
    <Search className="mr-2 h-4 w-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        "flex h-11 w-full rounded-md bg-transparent py-3 text-sm outline-none placeholder:text-[var(--text)] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      {...props}
    />
  </div>
)

const CommandList = ({ className, ...props }) => (
  <CommandPrimitive.List
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    {...props}
  />
)

const CommandEmpty = (props) => (
  <CommandPrimitive.Empty className="py-6 text-center text-sm" {...props} />
)

const CommandGroup = ({ className, ...props }) => (
  <CommandPrimitive.Group
    className={cn(
      "overflow-hidden p-1 text-[var(--text-h)] [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group-heading]]:text-[var(--text)]",
      className
    )}
    {...props}
  />
)

const CommandSeparator = ({ className, ...props }) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-[var(--border)]", className)}
    {...props}
  />
)

const CommandItem = ({ className, ...props }) => (
  <CommandPrimitive.Item
    className={cn(
      "relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none data-[disabled=true]:pointer-events-none data-[selected=true]:bg-[var(--accent-bg)] data-[selected=true]:text-[var(--text-h)] data-[disabled=true]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
      className
    )}
    {...props}
  />
)

const CommandShortcut = ({ className, ...props }) => (
  <span
    className={cn("ml-auto text-xs tracking-widest text-[var(--text)]", className)}
    {...props}
  />
)

export {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
