/** A type that removes null and undefined from the fields of an object. */
export type NoNullFields<Ob> = { [K in keyof Ob]: NonNullable<Ob[K]> };
