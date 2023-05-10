import type { KeyOfType } from "@/utils/typeUtils"
import type { Component } from "vue"
import type { RouteLocationRaw } from "vue-router"

export interface BaseHeadlessUiProps<TValue, TItem> {
  /**
   * label for the input
   */
  label: string

  /**
   * list of available items
   */
  items: TItem[]

  /**
   * key to use to get the underlying value from a provided object
   * see valueFn
   */
  valueKey: KeyOfType<TItem, TValue> | ((item: TItem) => TValue)

  /**
   * key to use to get the display text from a provided object
   * see displayFn
   */
  displayKey: keyof TItem | ((item: TItem) => string)
}

export interface SingleListboxProps<TValue, TItem> extends BaseHeadlessUiProps<TValue, TItem> {
  /**
   * modelValue to implement a two-way binding
   * see https://vuejs.org/guide/components/v-model.html
   */
  modelValue: TValue

  /**
   * toggles a clear button that sets the modelValue to null
   * note that this should only be flagged if the TValue type can possibly be null
   * i.e. `number | null` rather than just `number`.
   */
  clearable?: boolean
}

export interface MultiListboxProps<TValue, TItem> extends BaseHeadlessUiProps<TValue, TItem> {
  /**
   * modelValue to implement a two-way binding
   * see https://vuejs.org/guide/components/v-model.html
   */
  modelValue: TValue[]
}

export interface ComboboxProps<TValue, TItem> extends BaseHeadlessUiProps<TValue, TItem> {
  /**
   * modelValue to implement a two-way binding
   * see https://vuejs.org/guide/components/v-model.html
   */
  modelValue: TValue
}

export interface RadioGroupProps<TValue, TItem> extends Omit<BaseHeadlessUiProps<TValue, TItem>, 'displayKey'> {
  /**
   * modelValue to implement a two-way binding
   * see https://vuejs.org/guide/components/v-model.html
   */
  modelValue: TValue

  /**
   * key to use to get the main label text from a provided object
   * see labelFn
   */
  labelKey: keyof TItem

  /**
   * key to use to get the description text from a provided object
   * see descriptionFn
   */
  descriptionKey: keyof TItem | ((item: TItem) => string)
}

export interface VMenuItemProp  {
  /**
   * main text for the menu item
   */
  text: string

  /**
   * icon component to display to the left of the text
   */
  icon: Component

  /**
   * whether the menu item is disabled
   */
  disabled?: boolean

  /**
   * function to call when the menu item is clicked
   * @example () => alert('hello world')
   */
  action?: () => void

  /**
   * internal link to navigate to when the menu item is clicked
   * @example '/about'
   */
  to?: RouteLocationRaw

  /**
   * external link to navigate to when the menu item is clicked
   * @example https://www.google.com
   */
  href?: string

  /**
   * whether or not to open link in new tab
   */
  newTab?: boolean
}
