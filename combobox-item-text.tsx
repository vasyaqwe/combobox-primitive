import {
   type ComponentPropsWithoutRef,
   type Ref,
   forwardRef,
   useEffect,
   useId,
} from "react"
import { ID_PREFIX } from "./combobox-context"
import { useComboboxItemContext } from "./combobox-item-context"

export const ItemText = forwardRef(
   (
      props: ComponentPropsWithoutRef<"span">,
      forwardedRef: Ref<HTMLSpanElement>,
   ) => {
      const id = `${ID_PREFIX}-item-text-${useId()}`

      const { setTextId } = useComboboxItemContext()

      useEffect(() => {
         setTextId(id)
         return () => setTextId(undefined)
      })

      return (
         <span
            {...props}
            id={id}
            ref={forwardedRef}
         />
      )
   },
)

ItemText.displayName = "ComboboxPrimitive.ItemText"
