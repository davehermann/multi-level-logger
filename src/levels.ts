import { StandardLevels } from "./interfaces";

/**
 * Available log levels
 */
const levels: StandardLevels = {
    dev: 0,
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};

export {
    levels,
};
