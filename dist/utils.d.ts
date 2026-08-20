export declare function randomKey(): `${number}-${string}` | `${string}-${string}-${string}-${string}-${string}`;
export declare function isNotFoundError(error: any): boolean;
export declare function callbackOrPromise<T>(invoke: (done: (error?: unknown, value?: T) => void) => unknown): Promise<T>;
export declare function valueToString(value: unknown): string;
