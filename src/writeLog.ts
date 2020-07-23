import { IBaseConfiguration, ILog, ILogOptions } from "./interfaces";
import { levels } from "./levels";

function formatStackTrace(callSite) {
    let functionName = callSite.getFunctionName(),
        fileName = callSite.getFileName(),
        lineNumber = callSite.getLineNumber();

    // Drop the working directory from the file name
    fileName = fileName.replace(process.cwd(), `.`);

    return `${functionName}() [line ${lineNumber}: ${fileName}]`;
}

function reportLineNumber(belowFn?) {
    const dummyObject = {},
        v8Limit = Error.stackTraceLimit,
        originalStackTrace = Error.prepareStackTrace;

    Error.stackTraceLimit = Infinity;
    Error.prepareStackTrace = (err, v8Trace) => v8Trace;
    Error.captureStackTrace(dummyObject, belowFn || reportLineNumber);

    // @ts-ignore
    const v8StackTrace = dummyObject.stack;
    Error.prepareStackTrace = originalStackTrace;
    Error.stackTraceLimit = v8Limit;

    // Filter out the stack elements from this module, or a calling module in node_modules
    const callerStack = v8StackTrace.filter(callSite => {
        const fileName = callSite.getFileName();
        return (fileName.indexOf(`/multi-level-logger/`) < 0) && (fileName.indexOf(`/node_modules/`) < 0);
    });

    // Return the formatted first item on the stack
    return formatStackTrace(callerStack[0]);
}

/**
 * Write the log entry
 * @param logLevelId - ID level of the log (anything less than zero always writes)
 * @param data - Data to write to the log
 * @param asIs - Override the conversion of an *Object* to JSON
 * @param logName - Name of the log to write to
 */
function writeLog(configuration: IBaseConfiguration, logLevelId: string, data: string, asIs?: boolean | string, logName?: string);
function writeLog(configuration: IBaseConfiguration, logLevelId: string, data: object, asIs?: boolean | string, logName?: string);
function writeLog(configuration: IBaseConfiguration, logLevelId: number, data: string, asIs?: boolean | string, logName?: string);
function writeLog(configuration: IBaseConfiguration, logLevelId: number, data: object, asIs?: boolean | string, logName?: string);
function writeLog(configuration: IBaseConfiguration, logLevelId: any, data: any, asIs: boolean | string, logName: string) {
    const options: ILogOptions = {};
    if (typeof asIs == `string`) {
        logName = asIs;
        asIs = undefined;
    }
    options.asIs = (asIs === true);
    options.logName = logName;

    logWriter(data, { configuration, logLevelId, options });
}
function logWriter(data: string | Record<string, unknown>, { configuration, logLevelId, options }: ILog) {
    if (!options) options = {};
    let { configuration: configurationOverride, asIs, logName } = options;
    if (!configurationOverride) configurationOverride = {};
    let { includeTimestamp: overrideTimestamp, includeCodeLocation: overrideCodeLocation, jsonFormatter: overrideJsonFormatter } = configurationOverride;
    let messageLevel = levels[logLevelId];

    // Apply configuration overrides
    const localConfiguration: IBaseConfiguration = {
        logLevel: configuration.logLevel,
        includeTimestamp: (overrideTimestamp !== undefined) ? overrideTimestamp : configuration.includeTimestamp,
        includeCodeLocation: (overrideCodeLocation !== undefined) ? overrideCodeLocation : configuration.includeCodeLocation,
        jsonFormatter: (overrideJsonFormatter !== undefined) ? overrideJsonFormatter : configuration.jsonFormatter,
    };

    // For the always-write "Log" level, there will be no message level defined
    if (messageLevel === undefined)
        messageLevel = logLevelId;

    if (!logName || !localConfiguration.logLevel[logName])
        logName = `default`;

    // Any log level below 0 means always write the log data
    if ((localConfiguration.logLevel[logName] <= messageLevel) || (messageLevel < 0)) {
        let useRawData = asIs || (typeof data !== `object`),
            logData = (useRawData ? data.toString() : JSON.stringify(data, null, localConfiguration.jsonFormatter));

        // Handle timestamp and code location
        let additionalData = [];
        if (localConfiguration.includeTimestamp) {
            const timestamp = new Date(),
                dateDisplay = timestamp.toLocaleString();

            additionalData.push(dateDisplay);
        }

        if (localConfiguration.includeCodeLocation) {
            const callerStackTrace = reportLineNumber();
            additionalData.push(callerStackTrace);
        }

        let displayData = additionalData.join(` - `);

        // Always display the data on a new line when code location is included
        displayData += (localConfiguration.includeCodeLocation && !useRawData ? `\n` : ` - `);

        if (!useRawData) {
            logData = logData.replace(/\n/g, (`\n`).padEnd(localConfiguration.includeCodeLocation ? 6 : (displayData.length - 3) + 4, ` `));
            if (localConfiguration.includeCodeLocation)
                logData = `     ${logData}`;
        }

        logData = `${displayData}${logData}`;

        // eslint-disable-next-line no-console
        console[messageLevel < levels.error ? `log` : `error`](logData);
    }
}

export {
    writeLog as WriteLog,
    logWriter as LogWriter,
};
