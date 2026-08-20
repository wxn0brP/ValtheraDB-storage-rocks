export const COLLECTION_PREFIX = "c!";
export const DATA_PREFIX = "d!";
export const PREFIX_END = "\xff";

export function encodePart(part: unknown) {
	return encodeURIComponent(String(part));
}

export function decodePart(part: string) {
	return decodeURIComponent(part);
}

export function collectionKey(collection: string) {
	return COLLECTION_PREFIX + encodePart(collection);
}

export function dataPrefix(collection: string) {
	return DATA_PREFIX + encodePart(collection) + "!";
}

export function dataKey(collection: string, id: unknown) {
	return dataPrefix(collection) + encodePart(id);
}
