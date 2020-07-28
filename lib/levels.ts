import { IStandardLevels } from "./interfaces";

/**
 * Available log levels
 */
const levels: IStandardLevels = {
    dev: 0,
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};

/** ANSI colors defined for use in logs */
//  Codes are defined as the escape character (Decimal 27, hexadecimal 1B) followed by code
// See https://en.wikipedia.org/wiki/ANSI_escape_code#Colors

enum colors {
    brightBlue = `\x1b[94m`,
    brightRed = `\x1b[91m`,
    brightYellow = `\x1b[93m`,
    bold = `\x1b[1m`,
    green = `\x1b[32m`,
    red = `\x1b[31m`,
    reset = `\x1b[0m`,
    yellow = `\x1b[33m`,

    background_red = `\x1b[41m`,
}

export {
    levels,
    colors
};
