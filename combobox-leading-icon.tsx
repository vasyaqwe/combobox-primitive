import type { ReactElement } from "react"

export const LeadingIcon = ({ children }: { children: ReactElement }) => {
   return <div className="shrink-0">{children}</div>
}

LeadingIcon.displayName = "ComboboxPrimitive.LeadingIcon"
