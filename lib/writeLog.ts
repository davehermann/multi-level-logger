import { ILogOptionConfiguration, ILog, IStackTraceObject } from "./interfaces";
import { levels, colors } from "./levels";

function formatStackTrace(callSite: NodeJS.CallSite): Array<string> {
    const functionName = callSite.getFunctionName(),
        // Drop the working directory from the file name
        fileName = callSite.getFileName().replace(process.cwd(), `.`),
        lineNumber = callSite.getLineNumber();

    return [`${functionName}()`, `[line ${lineNumber}: ${fileName}]`];
}

function reportLineNumber(belowFn?): Array<string> {
    const dummyObject: IStackTraceObject = {},
        v8Limit = Error.stackTraceLimit,
        originalStackTrace = Error.prepareStackTrace;

    Error.stackTraceLimit = Infinity;
    Error.prepareStackTrace = (err, v8Trace) => v8Trace;
    Error.captureStackTrace(dummyObject, belowFn || reportLineNumber);

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

function colorLog(logString, color, options: ILogOptionConfiguration) {
    if (options.useColors)
        return `${color}${logString}${colors.reset}`;

    return logString;
}

function logWriter(data: string | Record<string, unknown>, { configuration, messageLevel, options = {} }: ILog): void {
    const { configuration: configurationOverride = {} } = options;
    let { logName, asIs } = options;

    // By default, any errors should be logged asIs to handle the stack trace
    if ((messageLevel >= levels.error) && (asIs === undefined))
        asIs = true;

    const {
        includeTimestamp: overrideTimestamp,
        includeCodeLocation: overrideCodeLocation,
        jsonFormatter: overrideJsonFormatter,
        useColors: overrideUseColors,
    } = configurationOverride;

    // Apply configuration overrides
    const localConfiguration: ILogOptionConfiguration = {
        includeTimestamp: (overrideTimestamp !== undefined) ? overrideTimestamp : configuration.includeTimestamp,
        includeCodeLocation: (overrideCodeLocation !== undefined) ? overrideCodeLocation : configuration.includeCodeLocation,
        jsonFormatter: (overrideJsonFormatter !== undefined) ? overrideJsonFormatter : configuration.jsonFormatter,
        useColors: (overrideUseColors !== undefined) ? overrideUseColors : configuration.useColors,
    };

    if (!logName || !configuration.logLevel[logName])
        logName = `default`;

    // Any log level below 0 means always write the log data
    if ((configuration.logLevel[logName] <= messageLevel) || (messageLevel < 0)) {
        const useRawData = asIs || (typeof data !== `object`);
        let logData = (useRawData ? data.toString() : JSON.stringify(data, null, localConfiguration.jsonFormatter));

        // Handle timestamp and code location
        const additionalData = [];
        if (localConfiguration.includeTimestamp) {
            const timestamp = new Date(),
                dateDisplay = timestamp.toLocaleString();

            additionalData.push({ text: colorLog(dateDisplay, colors.brightBlue, localConfiguration), length: dateDisplay.length });
        }

        if (localConfiguration.includeCodeLocation) {
            const callerStackTrace = reportLineNumber();
            additionalData.push({ text: `${colorLog(callerStackTrace[0], colors.brightYellow, localConfiguration)} ${colorLog(callerStackTrace[1], colors.green, localConfiguration)}`, length: callerStackTrace.length });
        }

        let displayData = additionalData.map(s => s.text).join(` - `);

        // Always display the data on a new line when code location is included
        displayData += (localConfiguration.includeCodeLocation && !useRawData ? `\n` : ` - `);

        if (!useRawData) {
            const dataLength: number = additionalData.reduce((prev, cur) => {
                return { length: prev.length + cur.length };
            }, { length: 0 }).length + 4;

            logData = logData.replace(/\n/g, (`\n`).padEnd(localConfiguration.includeCodeLocation ? 6 : dataLength, ` `));
            if (localConfiguration.includeCodeLocation)
                logData = `     ${logData}`;
        }

        logData = `${displayData}${colorLog(logData, colors.bold, localConfiguration)}`;

        // eslint-disable-next-line no-console
        console[messageLevel < levels.error ? `log` : `error`](logData);
    }
}

export {
    logWriter as LogWriter,
};
