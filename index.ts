import type { FC } from "react"
import { type ComboboxProps, Combobox as Root } from "./combobox"
import { ClearButton } from "./combobox-clear-button"
import { Content } from "./combobox-content"
import { ComboboxProvider, useComboboxContext } from "./combobox-context"
import { Disclosure } from "./combobox-disclosure"
import { Empty } from "./combobox-empty"
import { Group } from "./combobox-group"
import { Input } from "./combobox-input"
import { Item } from "./combobox-item"
import { ItemIndicator } from "./combobox-item-indicator"
import { ItemText } from "./combobox-item-text"
import { Label } from "./combobox-label"
import { LeadingIcon } from "./combobox-leading-icon"
import { Portal } from "./combobox-portal"
import { SelectedItems } from "./combobox-selected-items"
import { Trigger } from "./combobox-trigger"

export { useComboboxContext, ComboboxProvider }

export const ComboboxPrimitive: FC<ComboboxProps> & {
   Group: typeof Group
   Item: typeof Item
   ItemText: typeof ItemText
   ItemIndicator: typeof ItemIndicator
   Label: typeof Label
   Content: typeof Content
   Trigger: typeof Trigger
   LeadingIcon: typeof LeadingIcon
   Empty: typeof Empty
   Input: typeof Input
   Disclosure: typeof Disclosure
   SelectedItems: typeof SelectedItems
   ClearButton: typeof ClearButton
   Portal: typeof Portal
} = Object.assign(Root, {
   Group,
   Item,
   ItemText,
   ItemIndicator,
   Label,
   Content,
   Trigger,
   LeadingIcon,
   Empty,
   Input,
   Disclosure,
   SelectedItems,
   ClearButton,
   Portal,
})

ComboboxPrimitive.displayName = "ComboboxPrimitive.Root"
Group.displayName = "ComboboxPrimitive.Group"
Item.displayName = "ComboboxPrimitive.Item"
ItemText.displayName = "ComboboxPrimitive.ItemText"
ItemIndicator.displayName = "ComboboxPrimitive.ItemIndicator"
Label.displayName = "ComboboxPrimitive.Label"
Content.displayName = "ComboboxPrimitive.Content"
Trigger.displayName = "ComboboxPrimitive.Trigger"
LeadingIcon.displayName = "ComboboxPrimitive.LeadingIcon"
Empty.displayName = "ComboboxPrimitive.Empty"
Input.displayName = "ComboboxPrimitive.Input"
Disclosure.displayName = "ComboboxPrimitive.Disclosure"
SelectedItems.displayName = "ComboboxPrimitive.SelectedItems"
ClearButton.displayName = "ComboboxPrimitive.ClearButton"
Portal.displayName = "ComboboxPrimitive.Portal"
