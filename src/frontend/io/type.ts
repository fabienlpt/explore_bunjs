export type DomainType<T> = Array<T>
export type PossibleValuesType = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9;
export type CellDomainsType = DomainType<PossibleValuesType>;

export type NativeJsonType = number | string | boolean | null;
export type JsonArray = JSON[];
export type JsonObject = { [key: string]: JSON };
export type JSON = NativeJsonType | JsonArray | JsonObject;