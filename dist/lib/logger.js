"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Log = exports.Fatal = exports.Err = exports.Warn = exports.Info = exports.Debug = exports.Trace = exports.Dev = exports.GetConfiguredLogging = exports.OutputFormatting = exports.InitializeLogging = exports.LogLevels = void 0;
const levels_1 = require("./levels");
Object.defineProperty(exports, "LogLevels", { enumerable: true, get: function () { return levels_1.levels; } });
const writeLog_1 = require("./writeLog");
const _configuration = {};
/**
 * Reset the configuration object to default settings
 * @param forceReset - Reset the configuration when a configuration object already exists
 */
function resetLogging(forceReset) {
    var _a, _b;
    // Initialize an uninitialized configuration, or if forcing
    if (!_configuration.logLevel || forceReset) {
        const defaultLogLevel = levels_1.levels[((_b = (_a = process.env.LOG_LEVEL) !== null && _a !== void 0 ? _a : process.env.log_level) !== null && _b !== void 0 ? _b : `warn`).toLowerCase()];
        _configuration.logLevel = { default: defaultLogLevel };
        _configuration.includeTimestamp = true;
        _configuration.includeCodeLocation = true;
        _configuration.jsonFormatter = 4;
        _configuration.useColors = true;
    }
}
/** Used to proxy log writting while ensuring configuration */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LogWriterProxy(data, options) {
    // Set the configuration
    resetLogging();
    // Write the log
    writeLog_1.LogWriter(data, options);
}
/**
 *
 * @param logDefinition - The log level initializer matching one of four types
 *      1. *String* - a string matching a log level in the levels object
 *      1. *Number* - an integer value to use as the log level
 *      1. *Object* - an object with a `logLevel` property, matching 1 or 2 above
 *      1. *Object* - an object with each key matching a named log, and the value as 1, 2, or 3 above
 * @param logName - Name of the log, defaulting to "default"
 * @param _subLog - INTERNAL TRACKING ONLY
 */
function initialize(logDefinition, logName = `default`, _subLog = false) {
    // Reset the configuration
    if (!_subLog)
        resetLogging(true);
    switch (typeof logDefinition) {
        case `string`:
            _configuration.logLevel[logName] = levels_1.levels[logDefinition.toLowerCase()];
            break;
        case `number`:
            // Warn for numbers above fatal, and set to fatal-level
            // Anything below dev can remain as-is since it will write to all logs
            if (logDefinition > levels_1.levels.fatal)
                // eslint-disable-next-line no-console
                console.warn(`Log level "${logDefinition}" is above the highest log level of "fatal" (${levels_1.levels.fatal}), and will be set to "${levels_1.levels.fatal}"`);
            _configuration.logLevel[logName] = Math.min(logDefinition, levels_1.levels.fatal);
            break;
        case `object`:
            // Check the top level properties only
            for (const prop in logDefinition) {
                if (prop == `logLevel`)
                    initialize(logDefinition[prop], undefined, true);
                else if ((typeof logDefinition[prop] == `object`) && !!logDefinition[prop].logLevel)
                    initialize(logDefinition[prop].logLevel, prop, true);
            }
            break;
    }
}
exports.InitializeLogging = initialize;
/**
 * Set the formatting for output
 * @param options - formatting options
 */
function outputFormatting({ includeTimestamp, includeCodeLocation, jsonFormatter, useColors }) {
    // Set the configuration
    resetLogging();
    if (includeTimestamp !== undefined)
        _configuration.includeTimestamp = includeTimestamp;
    if (includeCodeLocation !== undefined)
        _configuration.includeCodeLocation = includeCodeLocation;
    if (jsonFormatter !== undefined)
        _configuration.jsonFormatter = jsonFormatter;
    if (useColors !== undefined)
        _configuration.useColors = useColors;
}
exports.OutputFormatting = outputFormatting;
/**
 * Get the current log settings
 */
function currentLogging() {
    return _configuration;
}
exports.GetConfiguredLogging = currentLogging;
/**
 * Dev-level
 *   - *equivalent to log level 0*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function dev(data, options) { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels_1.levels.dev, options }); }
exports.Dev = dev;
/**
 * Trace-level
 *   - *equivalent to log level 10*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function trace(data, options) { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels_1.levels.trace, options }); }
exports.Trace = trace;
/**
 * Debug-level
 *   - *equivalent to log level 20*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function debug(data, options) { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels_1.levels.debug, options }); }
exports.Debug = debug;
/**
 * Info-level
 *   - *equivalent to log level 30*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function info(data, options) { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels_1.levels.info, options }); }
exports.Info = info;
/**
 * Warn-level
 *   - *equivalent to log level 40*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function warn(data, options) { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels_1.levels.warn, options }); }
exports.Warn = warn;
/**
 * Error-level
 *   - *equivalent to log level 50*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 * @param options.asIs - defaults to **true** for error-level
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function err(data, options) { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels_1.levels.error, options }); }
exports.Err = err;
/**
 * Fatal-level
 *   - *equivalent to log level 60*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 * @param options.asIs - defaults to **true** for fatal-level
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function fatal(data, options) { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels_1.levels.fatal, options }); }
exports.Fatal = fatal;
/**
 * Always write log data irrespective of level
 *   - *equivalent to console.log()*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function alwaysWriteToLog(data, options) { LogWriterProxy(data, { configuration: _configuration, messageLevel: -1, options }); }
exports.Log = alwaysWriteToLog;
