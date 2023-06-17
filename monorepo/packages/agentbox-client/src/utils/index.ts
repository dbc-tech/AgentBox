export type ObjectToUnion<T> = T[keyof T]
export type Nillable<T> = T | undefined | null
export type Nullable<T> = T | null
export type Unpack<T> = T extends Array<infer U> ? U : T
