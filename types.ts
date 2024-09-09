import type {
   UseComboboxReturnValue,
   UseMultipleSelectionReturnValue,
} from "downshift"

export type ComboboxItem = {
   disabled: boolean
   value: string
   text: string
}

export type ItemsMap = Map<string, ComboboxItem>

export type DownshiftState = UseComboboxReturnValue<ComboboxItem> &
   UseMultipleSelectionReturnValue<ComboboxItem>
