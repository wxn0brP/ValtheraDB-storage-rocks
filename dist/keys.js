export const COLLECTION_PREFIX = "c!";
export const DATA_PREFIX = "d!";
export const PREFIX_END = "\xff";
export function encodePart(part) {
    return encodeURIComponent(String(part));
}
export function decodePart(part) {
    return decodeURIComponent(part);
}
export function collectionKey(collection) {
    return COLLECTION_PREFIX + encodePart(collection);
}
export function dataPrefix(collection) {
    return DATA_PREFIX + encodePart(collection) + "!";
}
export function dataKey(collection, id) {
    return dataPrefix(collection) + encodePart(id);
}
