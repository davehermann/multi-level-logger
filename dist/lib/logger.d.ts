import { ILogDefinition, IBaseConfiguration, ILogOptions, ILogOptionConfiguration } from "./interfaces";
import { levels } from "./levels";
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
declare function initialize(logDefinition: string | number | ILogDefinition, logName?: string, _subLog?: boolean): void;
/**
 * Set the formatting for output
 * @param options - formatting options
 */
declare function outputFormatting({ includeTimestamp, includeCodeLocation, jsonFormatter, useColors }: ILogOptionConfiguration): void;
/**
 * Get the current log settings
 */
declare function currentLogging(): IBaseConfiguration;
/**
 * Dev-level
 *   - *equivalent to log level 0*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
declare function dev(data: string | Record<string, unknown>, options?: ILogOptions): void;
/**
 * Trace-level
 *   - *equivalent to log level 10*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
declare function trace(data: string | Record<string, unknown>, options?: ILogOptions): void;
/**
 * Debug-level
 *   - *equivalent to log level 20*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
declare function debug(data: string | Record<string, unknown>, options?: ILogOptions): void;
/**
 * Info-level
 *   - *equivalent to log level 30*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
declare function info(data: string | Record<string, unknown>, options?: ILogOptions): void;
/**
 * Warn-level
 *   - *equivalent to log level 40*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
declare function warn(data: string | Record<string, unknown>, options?: ILogOptions): void;
/**
 * Error-level
 *   - *equivalent to log level 50*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 * @param options.asIs - defaults to **true** for error-level
 */
declare function err(data: string | Record<string, unknown>, options?: ILogOptions): void;
/**
 * Fatal-level
 *   - *equivalent to log level 60*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 * @param options.asIs - defaults to **true** for fatal-level
 */
declare function fatal(data: string | Record<string, unknown>, options?: ILogOptions): void;
/**
 * Always write log data irrespective of level
 *   - *equivalent to console.log()*
 * @param data - Data to write to the log
 * @param options - Additional options for controlling log output
 */
declare function alwaysWriteToLog(data: string | Record<string, unknown>, options?: ILogOptions): void;
export { levels as LogLevels, initialize as InitializeLogging, outputFormatting as OutputFormatting, currentLogging as GetConfiguredLogging, dev as Dev, trace as Trace, debug as Debug, info as Info, warn as Warn, err as Err, fatal as Fatal, alwaysWriteToLog as Log, };
