import { cn } from "@/ui/utils"
import {
   type ComponentPropsWithoutRef,
   type Ref,
   forwardRef,
   useEffect,
} from "react"
import { useComboboxContext } from "./combobox-context"
import { useCombinedState } from "./hooks/use-combined-state"
import { useMergeRefs } from "./hooks/use-merge-refs"

type InputProps = Omit<
   ComponentPropsWithoutRef<"input">,
   "value" | "placeholder"
> & {
   className?: string
   placeholder?: string
   value?: string
   defaultValue?: string
   onValueChange?: (value: string) => void
}

export const Input = forwardRef(
   (
      {
         className,
         placeholder,
         value,
         defaultValue,
         onValueChange,
         ...props
      }: InputProps,
      forwardedRef: Ref<HTMLInputElement>,
   ) => {
      const ctx = useComboboxContext()
      const [inputValue] = useCombinedState(value, defaultValue)

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
         if (inputValue != null) {
            ctx.setInputValue(inputValue)
         }
      }, [inputValue])

      // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
      useEffect(() => {
         if (onValueChange) {
            ctx.setOnInputValueChange(() => onValueChange)
         }

         // Sync input with combobox default value
         if (!ctx.multiple && ctx.selectedItem) {
            ctx.setInputValue(ctx.selectedItem.text)
         }
      }, [])

      const multiselectInputProps = ctx.getDropdownProps()
      const inputRef = useMergeRefs(
         forwardedRef,
         ctx.innerInputRef,
         multiselectInputProps.ref,
      )
      const downshiftInputProps = ctx.getInputProps({
         disabled: ctx.disabled || ctx.readOnly,
         ...multiselectInputProps,
         onKeyDown: (event) => {
            multiselectInputProps.onKeyDown?.(event)
            ctx.setLastInteractionType("keyboard")
            ctx.setIsTyping(true)
         },
         /**
          *
          * Important:
          * - without this, the input cursor is moved to the end after every change.
          * @see https://github.com/downshift-js/downshift/issues/1108#issuecomment-674180157
          */
         onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
            ctx.setInputValue(e.target.value)
         },
         ref: inputRef,
      })

      return (
         <input
            type="text"
            placeholder={placeholder}
            className={cn(
               "appearence-none w-full cursor-pointer bg-transparent focus:cursor-text",
               !ctx.multiple ? "pl-2" : "pl-0",
               className,
            )}
            {...props}
            {...downshiftInputProps}
            value={ctx.inputValue}
            disabled={ctx.disabled}
            readOnly={ctx.readOnly}
         />
      )
   },
)

Input.displayName = "ComboboxPrimitive.Input"
