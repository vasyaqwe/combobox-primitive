import { useComboboxContext } from "@/ui/components/combobox-primitive/combobox-context"
import { PopoverContent as RadixPopoverContent } from "@/ui/components/popover"
import { cn } from "@/ui/utils"
import {
   type ComponentProps,
   type Ref,
   forwardRef,
   useLayoutEffect,
   useRef,
} from "react"
import { useMergeRefs } from "./hooks/use-merge-refs"

export const Content = forwardRef(
   (
      {
         children,
         className,
         sideOffset = 4,
         ...props
      }: ComponentProps<typeof RadixPopoverContent>,
      forwardedRef: Ref<HTMLDivElement>,
   ) => {
      const ctx = useComboboxContext()

      const { ref: downshiftRef, ...downshiftMenuProps } = ctx.getMenuProps({
         onMouseMove: () => {
            ctx.setLastInteractionType("mouse")
         },
      })

      const innerRef = useRef<HTMLElement>(null)

      const ref = useMergeRefs(forwardedRef, downshiftRef, innerRef)

      const isOpen = ctx.isOpen

      const isPointerEventsDisabled = !isOpen

      useLayoutEffect(() => {
         if (innerRef.current?.parentElement) {
            innerRef.current.parentElement.style.pointerEvents =
               isPointerEventsDisabled ? "none" : ""
            innerRef.current.style.pointerEvents = isPointerEventsDisabled
               ? "none"
               : ""
         }
      }, [isPointerEventsDisabled])

      return (
         <RadixPopoverContent
            ref={forwardedRef}
            asChild
            sideOffset={sideOffset}
            onOpenAutoFocus={(e) => {
               /**
                * With a combobox pattern, the focus should remain on the trigger at all times.
                * Passing the focus to the combobox popover would break keyboard navigation.
                */
               e.preventDefault()
            }}
            className={cn("mt-0.5 p-1", className)}
            {...props}
         >
            <div
               ref={ref}
               {...downshiftMenuProps}
            >
               {children}
            </div>
         </RadixPopoverContent>
      )
   },
)

Content.displayName = "ComboboxPrimitive.Content"
