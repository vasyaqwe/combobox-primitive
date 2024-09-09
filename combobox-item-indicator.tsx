import { type ComponentPropsWithoutRef, type Ref, forwardRef } from "react"
import { useComboboxItemContext } from "./combobox-item-context"

export type ItemIndicatorProps = ComponentPropsWithoutRef<"span">

export const ItemIndicator = forwardRef(
   (
      { children, ...props }: ItemIndicatorProps,
      forwardedRef: Ref<HTMLSpanElement>,
   ) => {
      const { isSelected } = useComboboxItemContext()

      return (
         <span
            ref={forwardedRef}
            {...props}
         >
            {isSelected && children}
         </span>
      )
   },
)

ItemIndicator.displayName = "ComboboxPrimitive.ItemIndicator"
