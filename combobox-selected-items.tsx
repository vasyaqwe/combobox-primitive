import { cn } from "@/ui/utils"
import type { ComponentPropsWithoutRef } from "react"
import { useComboboxContext } from "./combobox-context"

export const SelectedItems = ({
   className,
   ...props
}: ComponentPropsWithoutRef<"span">) => {
   const ctx = useComboboxContext()

   return ctx.multiple ? (
      <span
         data-active={ctx.selectedItems.length > 0}
         className={cn(
            "flex size-[28px] shrink-0 justify-center whitespace-nowrap rounded-sm border py-0.5 font-medium",
            className,
         )}
         {...props}
      >
         {ctx.selectedItems.length} <span className="sr-only">обрано</span>
      </span>
   ) : null
}

SelectedItems.displayName = "ComboboxPrimitive.SelectedItems"
