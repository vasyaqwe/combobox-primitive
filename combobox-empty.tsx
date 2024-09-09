import { type ComponentPropsWithoutRef, type Ref, forwardRef } from "react"
import { useComboboxContext } from "./combobox-context"

export const Empty = forwardRef(
   (
      { children, ...props }: ComponentPropsWithoutRef<"div">,
      forwardedRef: Ref<HTMLDivElement>,
   ) => {
      const ctx = useComboboxContext()
      const hasNoItemVisible = ctx.filteredItemsMap.size === 0

      return hasNoItemVisible ? (
         <div
            ref={forwardedRef}
            {...props}
         >
            {children}
         </div>
      ) : null
   },
)

Empty.displayName = "ComboboxPrimitive.Empty"
