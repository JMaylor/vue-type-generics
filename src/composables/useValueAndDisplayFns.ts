import type { BaseHeadlessUiProps } from "@/types/componentTypes"

export function useValueAndDisplayFns<TValue, TItem>(props: BaseHeadlessUiProps<TValue, TItem>) {
  return {
    valueFn: (o: TItem) => typeof props.valueKey === 'function' ? props.valueKey(o) : o[props.valueKey] as TValue,
    displayFn: (o: TItem) => typeof props.displayKey === 'function' ? props.displayKey(o) : String(o[props.displayKey])
  }
}
