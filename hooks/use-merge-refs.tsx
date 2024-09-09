import {
   type LegacyRef,
   type MutableRefObject,
   type RefCallback,
   useMemo,
} from "react"

export type ReactRef<T> = RefCallback<T> | MutableRefObject<T> | LegacyRef<T>

export function assignRef<T>(ref: ReactRef<T> | null | undefined, value: T) {
   if (ref == null) {
      return
   }

   if (typeof ref === "function") {
      ref(value)

      return
   }

   try {
      ;(ref as MutableRefObject<T | null>).current = value
   } catch (_error) {
      throw new Error(`Cannot assign value '${value}' to ref '${ref}'`)
   }
}

export function mergeRefs<T>(
   ...refs: (MutableRefObject<T> | LegacyRef<T> | null | undefined)[]
): RefCallback<T> {
   return (value) => {
      // biome-ignore lint/complexity/noForEach: <explanation>
      refs.forEach((ref) => assignRef(ref, value))
   }
}

export function useMergeRefs<T>(...refs: (ReactRef<T> | null | undefined)[]) {
   // eslint-disable-next-line react-hooks/exhaustive-deps
   // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
   return useMemo(() => mergeRefs(...refs), refs)
}
