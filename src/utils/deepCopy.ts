/** Deep-copy a JSON-serializable object. */
export const deepCopy = (obj: any) => JSON.parse(JSON.stringify(obj));
