export type NoNullFields<Ob> = { [K in keyof Ob]: NonNullable<Ob[K]> };
