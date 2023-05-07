export type KeyOfType<T, V> = keyof { // [!code ++]
  [P in keyof T as T[P] extends V ? P : never]: any // [!code ++]
}