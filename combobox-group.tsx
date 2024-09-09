import React, {
   type ComponentPropsWithoutRef,
   forwardRef,
   type Ref,
} from "react"
import { useComboboxContext } from "./combobox-context"
import {
   ComboboxGroupProvider,
   useComboboxGroupContext,
} from "./combobox-items-group-context"

type GroupProps = ComponentPropsWithoutRef<"div">

export const Group = forwardRef(
   ({ children, ...props }: GroupProps, forwardedRef: Ref<HTMLDivElement>) => {
      return (
         <ComboboxGroupProvider>
            <GroupContent
               ref={forwardedRef}
               {...props}
            >
               {children}
            </GroupContent>
         </ComboboxGroupProvider>
      )
   },
)

const GroupContent = forwardRef(
   ({ children, ...props }: GroupProps, forwardedRef: Ref<HTMLDivElement>) => {
      const ctx = useComboboxContext()
      const groupCtx = useComboboxGroupContext()

      const hasVisibleOptions = React.Children.toArray(children).some(
         (child) => {
            return (
               React.isValidElement(child) &&
               ctx.filteredItemsMap.get(child.props.value)
            )
         },
      )

      return hasVisibleOptions ? (
         <div
            ref={forwardedRef}
            {...props}
            role="group"
            aria-labelledby={groupCtx.groupLabelId}
         >
            {children}
         </div>
      ) : null
   },
)

Group.displayName = "ComboboxPrimitive.Group"
