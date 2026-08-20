import { DataInternal } from "@wxn0brp/db-core/types/data";
export type RocksOpenOptions = {
    createIfMissing?: boolean;
    errorIfExists?: boolean;
    readOnly?: boolean;
    infoLogLevel?: "debug" | "info" | "warn" | "error" | "fatal" | "header" | null;
};
export type RocksIteratorOptions = {
    gte?: string;
    gt?: string;
    lte?: string;
    lt?: string;
};
export type RocksBatchOp = {
    type: "put";
    key: string;
    value: string;
} | {
    type: "del";
    key: string;
};
export type RocksCallback<T = void> = (error?: unknown, value?: T) => void;
export interface RocksDb {
    open: {
        (callback: RocksCallback): unknown;
        (options: RocksOpenOptions, callback: RocksCallback): unknown;
    };
    close: (callback: RocksCallback) => unknown;
    get: (key: string, callback: RocksCallback<unknown>) => unknown;
    put: (key: string, value: string, callback: RocksCallback) => unknown;
    del: (key: string, callback: RocksCallback) => unknown;
    batch: (ops: RocksBatchOp[], callback: RocksCallback) => unknown;
    iterator: (opts?: RocksIteratorOptions) => {
        next: (callback: (error: unknown, key?: unknown, value?: unknown) => void) => unknown;
        end: (callback: RocksCallback) => unknown;
    };
}
export type RocksEntry = {
    key: string;
    data: DataInternal;
};
