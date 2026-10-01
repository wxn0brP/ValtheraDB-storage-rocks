import { RocksBatchOp, RocksDb, RocksIteratorOptions, RocksOpenOptions } from "./types.js";
export declare function openDb(db: RocksDb, opts?: RocksOpenOptions): Promise<void>;
export declare function closeDb(db: RocksDb): Promise<void>;
export declare function getValue(db: RocksDb, key: string): Promise<unknown>;
export declare function putValue(db: RocksDb, key: string, value: string): Promise<void>;
export declare function delValue(db: RocksDb, key: string): Promise<void>;
export declare function batch(db: RocksDb, ops: RocksBatchOp[]): Promise<void>;
export declare function iterate(db: RocksDb, opts: RocksIteratorOptions): Promise<[string, unknown][]>;
export declare function entriesByPrefix(db: RocksDb, prefix: string): Promise<[string, unknown][]>;
