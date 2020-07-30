"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.colors = exports.levels = void 0;
/** Available log levels */
var levels;
(function (levels) {
    levels[levels["dev"] = 0] = "dev";
    levels[levels["trace"] = 10] = "trace";
    levels[levels["debug"] = 20] = "debug";
    levels[levels["info"] = 30] = "info";
    levels[levels["warn"] = 40] = "warn";
    levels[levels["error"] = 50] = "error";
    levels[levels["fatal"] = 60] = "fatal";
})(levels || (levels = {}));
exports.levels = levels;
/** ANSI colors defined for use in logs */
//  Codes are defined as the escape character (Decimal 27, hexadecimal 1B) followed by code
// See https://en.wikipedia.org/wiki/ANSI_escape_code#Colors
var colors;
(function (colors) {
    colors["brightBlue"] = "\u001B[94m";
    colors["brightRed"] = "\u001B[91m";
    colors["brightYellow"] = "\u001B[93m";
    colors["bold"] = "\u001B[1m";
    colors["green"] = "\u001B[32m";
    colors["red"] = "\u001B[31m";
    colors["reset"] = "\u001B[0m";
    colors["yellow"] = "\u001B[33m";
    colors["background_red"] = "\u001B[41m";
})(colors || (colors = {}));
exports.colors = colors;
