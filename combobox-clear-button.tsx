import {
   type ComponentPropsWithoutRef,
   type MouseEventHandler,
   forwardRef,
} from "react"
import { useComboboxContext } from "./combobox-context"

export const ClearButton = forwardRef<
   HTMLButtonElement,
   ComponentPropsWithoutRef<"button">
>(({ tabIndex = -1, onClick, children, ...props }, ref) => {
   const ctx = useComboboxContext()

   const handleClick: MouseEventHandler<HTMLButtonElement> = (event) => {
      event.stopPropagation()

      if (ctx.multiple) {
         ctx.setSelectedItems([])
      } else {
         ctx.selectItem(null)
      }

      ctx.setInputValue("")

      if (ctx.innerInputRef.current) {
         ctx.innerInputRef.current.focus()
      }

      if (onClick) {
         onClick(event)
      }
   }

   if (ctx.selectedItems.length === 0) return null

   return (
      <button
         ref={ref}
         tabIndex={tabIndex}
         onClick={handleClick}
         type="button"
         aria-label="Clear input"
         {...props}
      >
         {children}
      </button>
   )
})

ClearButton.displayName = "ComboboxPrimitive.ClearButton"
