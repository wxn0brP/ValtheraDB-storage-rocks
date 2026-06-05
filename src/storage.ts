import { PREFIX_END } from "./keys";
import { RocksBatchOp, RocksDb, RocksIteratorOptions, RocksOpenOptions } from "./types";
import { callbackOrPromise, isNotFoundError, valueToString } from "./utils";

export async function openDb(db: RocksDb, opts?: RocksOpenOptions) {
    await callbackOrPromise<void>(done => db.open({ createIfMissing: true, ...opts }, done));
}

export function closeDb(db: RocksDb) {
    return callbackOrPromise<void>(done => db.close(done));
}

export async function getValue(db: RocksDb, key: string) {
    try {
        return await callbackOrPromise<unknown>(done => db.get(key, done));
    } catch (error) {
        if (isNotFoundError(error)) return undefined;
        throw error;
    }
}

export function putValue(db: RocksDb, key: string, value: string) {
    return callbackOrPromise<void>(done => db.put(key, value, done));
}

export function delValue(db: RocksDb, key: string) {
    return callbackOrPromise<void>(done => db.del(key, done));
}

export function batch(db: RocksDb, ops: RocksBatchOp[]) {
    if (!ops.length) return Promise.resolve();
    return callbackOrPromise<void>(done => db.batch(ops, done));
}

export async function iterate(db: RocksDb, opts: RocksIteratorOptions) {
    const iterator = db.iterator(opts);
    const entries: Array<[string, unknown]> = [];

    try {
        while (true) {
            const item = await callbackOrPromise<[unknown, unknown] | null>(
                done => iterator.next((error: unknown, key: unknown, value: unknown) => {
                    if (error) done(error);
                    else done(undefined, key === undefined && value === undefined ? null : [key, value]);
                })
            );

            if (!item) break;
            entries.push([valueToString(item[0]), item[1]]);
        }
    } finally {
        await callbackOrPromise<void>(done => iterator.end(done));
    }

    return entries;
}

export function entriesByPrefix(db: RocksDb, prefix: string) {
    return iterate(db, { gte: prefix, lt: prefix + PREFIX_END });
}
