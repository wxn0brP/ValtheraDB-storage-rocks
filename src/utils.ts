export function randomKey() {
	return (
		globalThis.crypto?.randomUUID?.() ??
		`${Date.now()}-${Math.random().toString(36).slice(2)}`
	);
}

export function isNotFoundError(error: any) {
	return (
		error?.notFound === true ||
		error?.code === "LEVEL_NOT_FOUND" ||
		error?.code === "NOT_FOUND" ||
		error?.type === "NotFoundError" ||
		String(error?.message ?? error).startsWith("NotFound:")
	);
}

export function callbackOrPromise<T>(
	invoke: (done: (error?: unknown, value?: T) => void) => unknown,
) {
	return new Promise<T>((resolve, reject) => {
		let settled = false;
		const done = (error?: unknown, value?: T) => {
			if (settled) return;
			settled = true;
			error ? reject(error) : resolve(value as T);
		};

		try {
			const result = invoke(done);
			if (result && typeof (result as Promise<T>).then === "function") {
				(result as Promise<T>).then(
					value => done(undefined, value),
					error => done(error),
				);
			}
		} catch (error) {
			done(error);
		}
	});
}

export function valueToString(value: unknown) {
	if (Buffer.isBuffer(value)) return value.toString("utf8");
	if (value instanceof Uint8Array) return Buffer.from(value).toString("utf8");
	return String(value);
}
