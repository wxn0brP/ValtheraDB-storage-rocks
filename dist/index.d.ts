import { ValtheraClass } from "@wxn0brp/db-core";
import { AdapterBase } from "@wxn0brp/db-core/base/adapter";
import { Data, DataInternal } from "@wxn0brp/db-core/types/data";
import { VQueryT } from "@wxn0brp/db-core/types/query";
import { RocksDb, RocksEntry, RocksOpenOptions } from "./types.js";
export * from "./types.js";
export declare class RocksAdapter extends AdapterBase {
    location: string;
    opts?: RocksOpenOptions;
    _inited: boolean;
    db: RocksDb;
    version: string;
    constructor(location: string, opts?: RocksOpenOptions);
    init(): Promise<void>;
    close(): Promise<void>;
    getCollections(): Promise<string[]>;
    ensureCollection(collection: string): Promise<boolean>;
    issetCollection(collection: string): Promise<boolean>;
    _collectionEntries(collection: string): Promise<RocksEntry[]>;
    add(query: VQueryT.Add): Promise<DataInternal>;
    find(query: VQueryT.Find): Promise<Data[]>;
    findOne(query: VQueryT.FindOne): Promise<DataInternal>;
    update(query: VQueryT.Update): Promise<DataInternal[]>;
    updateOne(query: VQueryT.Update): Promise<DataInternal>;
    remove(query: VQueryT.Remove): Promise<DataInternal[]>;
    removeOne(query: VQueryT.Remove): Promise<DataInternal>;
    removeCollection(collection: string): Promise<boolean>;
}
export declare function createRocksValthera<T extends Record<string, Data> = {}>(location: string, opts?: RocksOpenOptions): import("@wxn0brp/db-core/types/typed").TypedValthera<T, ValtheraClass>;
export declare const DYNAMIC: {
    def(location: string, opts?: RocksOpenOptions): RocksAdapter;
};
