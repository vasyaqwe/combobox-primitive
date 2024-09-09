import { type ComponentProps, type Ref, forwardRef } from "react"
import { useComboboxContext } from "./combobox-context"
import { useMergeRefs } from "./hooks/use-merge-refs"

export const Disclosure = forwardRef(
   (
      { children, ...props }: ComponentProps<"button">,
      forwardedRef: Ref<HTMLButtonElement>,
   ) => {
      const ctx = useComboboxContext()

      const { ref: downshiftRef, ...downshiftDisclosureProps } =
         ctx.getToggleButtonProps({
            disabled: ctx.disabled || ctx.readOnly,
            onClick: (event) => {
               event.stopPropagation()
            },
         })
      const isExpanded = downshiftDisclosureProps["aria-expanded"]
      const ref = useMergeRefs(forwardedRef, downshiftRef)

      return (
         <button
            ref={ref}
            {...downshiftDisclosureProps}
            {...props}
            aria-label={isExpanded ? "Close popup" : "Open popup"}
            disabled={ctx.disabled}
         >
            {children}
         </button>
      )
   },
)

Disclosure.displayName = "ComboboxPrimitive.Disclosure"
