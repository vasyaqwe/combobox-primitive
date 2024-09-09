import { cn } from "@/ui/utils"
import { type HTMLAttributes, type Ref, forwardRef } from "react"
import { useComboboxContext } from "./combobox-context"
import {
   ComboboxItemProvider,
   useComboboxItemContext,
} from "./combobox-item-context"
import { useMergeRefs } from "./hooks/use-merge-refs"

export type ItemProps = HTMLAttributes<HTMLDivElement> & {
   disabled?: boolean
   value: string
}

export const Item = forwardRef(
   ({ children, ...props }: ItemProps, forwardedRef: Ref<HTMLDivElement>) => {
      const { value, disabled } = props

      return (
         <ComboboxItemProvider
            value={value}
            disabled={disabled}
         >
            <ItemContent
               ref={forwardedRef}
               {...props}
            >
               {children}
            </ItemContent>
         </ComboboxItemProvider>
      )
   },
)

const ItemContent = forwardRef(
   (
      { disabled = false, value, className, children, ...props }: ItemProps,
      forwardedRef: Ref<HTMLDivElement>,
   ) => {
      const ctx = useComboboxContext()
      const itemCtx = useComboboxItemContext()

      const isVisible = !!ctx.filteredItemsMap.get(value)

      const { ref: downshiftRef, ...downshiftItemProps } = ctx.getItemProps({
         item: itemCtx.itemData,
         index: itemCtx.index,
      })

      const ref = useMergeRefs(forwardedRef, downshiftRef)

      if (!isVisible) return null

      return (
         <div
            ref={ref}
            key={value}
            {...downshiftItemProps}
            {...props}
            data-focused={ctx.highlightedItem?.value === value}
            data-disabled={disabled}
            aria-selected={itemCtx.isSelected}
            aria-labelledby={itemCtx.textId}
            className={cn(
               "relative flex cursor-pointer items-center rounded-md py-2 pr-9 pl-3 data-[focused=true]:bg-accent",
               className,
            )}
         >
            {children}
         </div>
      )
   },
)

Item.displayName = "ComboboxPrimitive.Item"
