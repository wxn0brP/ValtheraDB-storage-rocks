import { PREFIX_END } from "./keys.js";
import { callbackOrPromise, isNotFoundError, valueToString } from "./utils.js";
export async function openDb(db, opts) {
    await callbackOrPromise(done => db.open({
        createIfMissing: true,
        ...opts,
    }, done));
}
export function closeDb(db) {
    return callbackOrPromise(done => db.close(done));
}
export async function getValue(db, key) {
    try {
        return await callbackOrPromise(done => db.get(key, done));
    }
    catch (error) {
        if (isNotFoundError(error))
            return undefined;
        throw error;
    }
}
export function putValue(db, key, value) {
    return callbackOrPromise(done => db.put(key, value, done));
}
export function delValue(db, key) {
    return callbackOrPromise(done => db.del(key, done));
}
export function batch(db, ops) {
    if (!ops.length)
        return Promise.resolve();
    return callbackOrPromise(done => db.batch(ops, done));
}
export async function iterate(db, opts) {
    const iterator = db.iterator(opts);
    const entries = [];
    try {
        while (true) {
            const item = await callbackOrPromise(done => iterator.next((error, key, value) => {
                if (error)
                    done(error);
                else
                    done(undefined, key === undefined && value === undefined
                        ? null
                        : [
                            key,
                            value,
                        ]);
            }));
            if (!item)
                break;
            entries.push([
                valueToString(item[0]),
                item[1],
            ]);
        }
    }
    finally {
        await callbackOrPromise(done => iterator.end(done));
    }
    return entries;
}
export function entriesByPrefix(db, prefix) {
    return iterate(db, {
        gte: prefix,
        lt: prefix + PREFIX_END,
    });
}
