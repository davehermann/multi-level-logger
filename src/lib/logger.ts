import { ILogDefinition, ILog, IBaseConfiguration, ILogOptions, ILogOptionConfiguration } from "./interfaces";
import { levels } from "./levels";
import LogWriter from "./writeLog";
import tLogObject from "./types";

const _configuration = <IBaseConfiguration>{};

/**
 * Reset the configuration object to default settings
 * @param forceReset - Reset the configuration when a configuration object already exists
 */
function resetLogging(forceReset?: boolean) {
    // Initialize an uninitialized configuration, or if forcing
    if (!_configuration.logLevel || forceReset) {
        const defaultLogLevel = levels[(process.env.LOG_LEVEL ?? process.env.log_level ?? `warn`).toLowerCase()];

        _configuration.logLevel = { default: defaultLogLevel };
        _configuration.includeTimestamp = true;
        _configuration.includeCodeLocation = true;
        _configuration.jsonFormatter = 4;
        _configuration.useColors = true;
    }
}

/** Used to proxy log writting while ensuring configuration */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function LogWriterProxy(data: tLogObject, options: ILog): void {
    // Set the configuration
    resetLogging();

    // Write the log
    LogWriter(data, options);
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
function initialize(logDefinition: string | number | ILogDefinition, logName = `default`, _subLog = false): void {
    // Reset the configuration
    if (!_subLog)
        resetLogging(true);

    switch (typeof logDefinition) {
        case `string`:
            _configuration.logLevel[logName] = levels[logDefinition.toLowerCase()];
            break;

        case `number`:
            // Warn for numbers above fatal, and set to fatal-level
            // Anything below dev can remain as-is since it will write to all logs
            if (logDefinition > levels.fatal)
                // eslint-disable-next-line no-console
                console.warn(`Log level "${logDefinition}" is above the highest log level of "fatal" (${levels.fatal}), and will be set to "${levels.fatal}"`);

            _configuration.logLevel[logName] = Math.min(logDefinition, levels.fatal);
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

/**
 * Set the formatting for output
 * @param options - formatting options
 */
function outputFormatting({ includeTimestamp, includeCodeLocation, jsonFormatter, useColors }: ILogOptionConfiguration): void {
    // Set the configuration
    resetLogging();

    if (includeTimestamp !== undefined) _configuration.includeTimestamp = includeTimestamp;
    if (includeCodeLocation !== undefined) _configuration.includeCodeLocation = includeCodeLocation;
    if (jsonFormatter !== undefined) _configuration.jsonFormatter = jsonFormatter;
    if (useColors !== undefined) _configuration.useColors = useColors;
}

/**
 * Get the current log settings
 */
function currentLogging(): IBaseConfiguration {
    return _configuration;
}

/**
 * Dev-level
 *   - *equivalent to log level 0*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function dev(data: tLogObject, options?: ILogOptions): void { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels.dev, options }); }
/**
 * Trace-level
 *   - *equivalent to log level 10*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function trace(data: tLogObject, options?: ILogOptions): void { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels.trace, options }); }
/**
 * Debug-level
 *   - *equivalent to log level 20*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function debug(data: tLogObject, options?: ILogOptions): void { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels.debug, options }); }
/**
 * Info-level
 *   - *equivalent to log level 30*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function info(data: tLogObject, options?: ILogOptions): void { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels.info, options }); }
/**
 * Warn-level
 *   - *equivalent to log level 40*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function warn(data: tLogObject, options?: ILogOptions): void { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels.warn, options }); }
/**
 * Error-level
 *   - *equivalent to log level 50*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 * @param options.asIs - defaults to **true** for error-level
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function err(data: tLogObject, options?: ILogOptions): void { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels.error, options }); }
/**
 * Fatal-level
 *   - *equivalent to log level 60*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 * @param options.asIs - defaults to **true** for fatal-level
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function fatal(data: tLogObject, options?: ILogOptions): void { LogWriterProxy(data, { configuration: _configuration, messageLevel: levels.fatal, options }); }
/**
 * Always write log data irrespective of level
 *   - *equivalent to console.log()*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
function alwaysWriteToLog(data: tLogObject, options?: ILogOptions): void { LogWriterProxy(data, { configuration: _configuration, messageLevel: -1, options }); }

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
