import * as _ from "lodash";

/** Deep-copy an object. */
export const deepCopy = (obj: unknown): any => _.cloneDeep(obj);
