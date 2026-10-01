export declare const COLLECTION_PREFIX = "c!";
export declare const DATA_PREFIX = "d!";
export declare const PREFIX_END = "\u00FF";
export declare function encodePart(part: unknown): string;
export declare function decodePart(part: string): string;
export declare function collectionKey(collection: string): string;
export declare function dataPrefix(collection: string): string;
export declare function dataKey(collection: string, id: unknown): string;
