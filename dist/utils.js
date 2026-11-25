export function randomKey() {
    return (globalThis.crypto?.randomUUID?.() ??
        `${Date.now()}-${Math.random().toString(36).slice(2)}`);
}
export function isNotFoundError(error) {
    return (error?.notFound === true ||
        error?.code === "LEVEL_NOT_FOUND" ||
        error?.code === "NOT_FOUND" ||
        error?.type === "NotFoundError" ||
        String(error?.message ?? error).startsWith("NotFound:"));
}
export function callbackOrPromise(invoke) {
    return new Promise((resolve, reject) => {
        let settled = false;
        const done = (error, value) => {
            if (settled)
                return;
            settled = true;
            error ? reject(error) : resolve(value);
        };
        try {
            const result = invoke(done);
            if (result && typeof result.then === "function") {
                result.then(value => done(undefined, value), error => done(error));
            }
        }
        catch (error) {
            done(error);
        }
    });
}
export function valueToString(value) {
    if (Buffer.isBuffer(value))
        return value.toString("utf8");
    if (value instanceof Uint8Array)
        return Buffer.from(value).toString("utf8");
    return String(value);
}
