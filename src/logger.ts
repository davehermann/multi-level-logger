import { LogDefinition, Settings, IBaseConfiguration, ILogOptions } from "./interfaces";
import { levels } from "./levels";
import { LogWriter, WriteLog } from "./writeLog";

let _configuration: IBaseConfiguration = {
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
function initialize(logDefinition: any, logName = `default`) {
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
            for (let prop in logDefinition) {
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
function outputFormatting(prependTs: boolean = true, jsonIndent: number = 4) {
    _configuration.includeTimestamp = prependTs;
    _configuration.jsonFormatter = jsonIndent;
}

/**
 * Get the current log settings
 */
function currentLogging(): Settings {
    return { logLevel: _configuration.logLevel, includeTimestamp: _configuration.includeTimestamp, jsonSpacing: _configuration.jsonFormatter };
}

function dev(data: any, asIs?: boolean | string, logName?: string) { WriteLog(_configuration, `dev`, data, asIs, logName); }
function trace(data: any, asIs?: boolean | string, logName?: string) { WriteLog(_configuration, `trace`, data, asIs, logName); }
function debug(data: any, asIs?: boolean | string, logName?: string) { WriteLog(_configuration, `debug`, data, asIs, logName); }
/**
 * Info-level; equivalent to 30
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
function info(data: string | Record<string, unknown>, options?: ILogOptions) { LogWriter(data, { configuration: _configuration, logLevelId: `info`, options }); };
function err(data: any, asIs?: boolean | string, logName?: string) { WriteLog(_configuration, `error`, data, asIs, logName); }

export {
    levels as LogLevels,
    initialize as InitializeLogging,
    outputFormatting as OutputFormatting,
    currentLogging as GetConfiguredLogging,

    dev as Dev,
    trace as Trace,
    debug as Debug,
    info as Info,
    err as Err,
};
