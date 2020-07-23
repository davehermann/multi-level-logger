import { LogDefinition, Settings, IBaseConfiguration, ILogOptions } from "./interfaces";
import { levels } from "./levels";
import { LogWriter } from "./writeLog";

const _configuration: IBaseConfiguration = {
    logLevel: { default: levels.warn },
    includeTimestamp: true,
    includeCodeLocation: true,
    jsonFormatter: 4,
};

/**
 *
 * @param logDefinition - The log level initializer matching one of four types
 *      1. *String* - a string matching a log level in the levels object
 *      1. *Number* - an integer value to use as the log level
 *      1. *Object* - an object with a `logLevel` property, matching 1 or 2 above
 *      1. *Object* - an object with each key matching a named log, and the value as 1, 2, or 3 above
 * @param logName - Name of the log, defaulting to "default"
 */
function initialize(logDefinition: string, logName?: string): void;
function initialize(logDefinition: number, logName?: string): void;
function initialize(logDefinition: LogDefinition, logName?: string): void;
function initialize(logDefinition: string | number | LogDefinition, logName = `default`): void {
    switch (typeof logDefinition) {
        case `string`:
            _configuration.logLevel[logName] = levels[logDefinition.toLowerCase()];
            break;

        case `number`:
            // Warn for numbers above fatal, and set to fatal-level
            // Anything below dev can remain as-is since it will write to all logs
            if (logDefinition > levels.fatal)
                // eslint-disable-next-line no-console
                console.log(`Log level "${logDefinition}" is above the highest log level of "fatal" (${levels.fatal}), and will be set to "${levels.fatal}"`);

            _configuration.logLevel[logName] = Math.min(logDefinition, levels.fatal);
            break;

        case `object`:
            // Check the top level properties only
            for (const prop in logDefinition) {
                if (prop == `logLevel`)
                    initialize(logDefinition[prop]);
                else if ((typeof logDefinition[prop] == `object`) && !!logDefinition[prop].logLevel)
                    initialize(logDefinition[prop].logLevel, prop);
            }
            break;
    }
}

/**
 * Set the formatting for output
 * @param prependTs - Include a timestamp before all logged entries
 * @param jsonIndent - Number of spaces to pass to `JSON.stringify()`
 */
function outputFormatting(prependTs = true, jsonIndent = 4): void {
    _configuration.includeTimestamp = prependTs;
    _configuration.jsonFormatter = jsonIndent;
}

/**
 * Get the current log settings
 */
function currentLogging(): Settings {
    return { logLevel: _configuration.logLevel, includeTimestamp: _configuration.includeTimestamp, jsonSpacing: _configuration.jsonFormatter };
}

/**
 * Dev-level
 *   - *equivalent to log level 0*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function dev(data: string | Record<string, unknown>, options?: ILogOptions): void { LogWriter(data, { configuration: _configuration, messageLevel: levels.dev, options }); }
/**
 * Trace-level
 *   - *equivalent to log level 10*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function trace(data: string | Record<string, unknown>, options?: ILogOptions): void { LogWriter(data, { configuration: _configuration, messageLevel: levels.trace, options }); }
/**
 * Debug-level
 *   - *equivalent to log level 20*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function debug(data: string | Record<string, unknown>, options?: ILogOptions): void { LogWriter(data, { configuration: _configuration, messageLevel: levels.debug, options }); }
/**
 * Info-level
 *   - *equivalent to log level 30*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function info(data: string | Record<string, unknown>, options?: ILogOptions): void { LogWriter(data, { configuration: _configuration, messageLevel: levels.info, options }); }
/**
 * Warn-level
 *   - *equivalent to log level 40*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function warn(data: string | Record<string, unknown>, options?: ILogOptions): void { LogWriter(data, { configuration: _configuration, messageLevel: levels.warn, options }); }
/**
 * Error-level
 *   - *equivalent to log level 50*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function err(data: string | Record<string, unknown>, options?: ILogOptions): void { LogWriter(data, { configuration: _configuration, messageLevel: levels.error, options }); }
/**
 * Fatal-level
 *   - *equivalent to log level 60*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function fatal(data: string | Record<string, unknown>, options?: ILogOptions): void { LogWriter(data, { configuration: _configuration, messageLevel: levels.fatal, options }); }
/**
 * Always write log data irrespective of level
 *   - *equivalent to console.log()*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function alwaysWriteToLog(data: string | Record<string, unknown>, options?: ILogOptions): void { LogWriter(data, { configuration: _configuration, messageLevel: -1, options }); }

export {
    levels as LogLevels,
    initialize as InitializeLogging,
    outputFormatting as OutputFormatting,
    currentLogging as GetConfiguredLogging,

    dev as Dev,
    trace as Trace,
    debug as Debug,
    info as Info,
    warn as Warn,
    err as Err,
    fatal as Fatal,
    alwaysWriteToLog as Log,
};
