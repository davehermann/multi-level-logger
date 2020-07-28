import { IAdditionalData, IAdditionalDataDisplay, ILogOptionConfiguration, ILog, IStackTraceObject, ILogColor } from "./interfaces";
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

function colorLog({ logString, color, options }: ILogColor) {
    if (options.useColors)
        return `${color}${logString}${colors.reset}`;

    return logString;
}

function displayAdditionalData({ additionalData, options, isError, isSublist }: IAdditionalDataDisplay): string {
    const displayData = [];
    let mergedData = null;

    while (additionalData.length > 0) {
        const nextData = additionalData.shift();

        if (typeof nextData.text === `string`) {
            // For errors, just add the text itself
            if (isError)
                displayData.push(nextData.text);
            else
                // Otherwise, color the text
                displayData.push(colorLog({ logString: nextData.text, options, color: nextData.color }));
        } else
            // Handle inner arrays
            displayData.push(displayAdditionalData({ additionalData: nextData.text, options, isError, isSublist: true }));
    }

    // Join a sublist with a space
    if (isSublist)
        mergedData = displayData.join(` `);
    else {
        // Top-level display is joined by a dash, and errors are fully colored
        mergedData = displayData.join(` - `);

        if (isError)
            mergedData = colorLog({ logString: mergedData, options, color: colors.brightRed });
    }

    return mergedData;
}

function logWriter(data: string | Record<string, unknown>, { configuration, messageLevel, options = {} }: ILog): void {
    const isError = messageLevel >= levels.error,
        { configuration: configurationOverride = {} } = options;
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
        const additionalData: Array<IAdditionalData> = [];
        let additionalDataLength = 0;

        if (localConfiguration.includeTimestamp) {
            const timestamp = new Date(),
                dateDisplay = timestamp.toLocaleString();

            additionalData.push({ text: dateDisplay, color: colors.brightBlue });
            additionalDataLength += dateDisplay.length;
            // additionalData.push({ text: colorLog({ logString: dateDisplay, color: colors.brightBlue, options: localConfiguration, isError }), length: dateDisplay.length });
        }

        if (localConfiguration.includeCodeLocation) {
            const callerStackTrace = reportLineNumber();
            additionalData.push({
                text: [
                    { text: callerStackTrace[0], color:  colors.brightYellow },
                    { text: callerStackTrace[1], color: colors.green }
                ]
            });
            additionalDataLength += callerStackTrace[0].length + callerStackTrace[1].length;
            // additionalData.push({ text: `${colorLog({ logString: callerStackTrace[0], color: colors.brightYellow, options: localConfiguration, isError })} ${colorLog({ logString: callerStackTrace[1], color: colors.green, options: localConfiguration, isError })}`, length: callerStackTrace.length });
        }

        let displayData = displayAdditionalData({ additionalData, options: localConfiguration, isError });

        // let displayData = additionalData.map(s => s.text).join(` - `);

        // Always display the data on a new line when code location is included
        displayData += (localConfiguration.includeCodeLocation && !useRawData ? `\n` : ` - `);

        if (!useRawData) {
            const dataLength: number = additionalDataLength + 4;

            logData = logData.replace(/\n/g, (`\n`).padEnd(localConfiguration.includeCodeLocation ? 6 : dataLength, ` `));
            if (localConfiguration.includeCodeLocation)
                logData = `     ${logData}`;
        }

        logData = `${displayData}${colorLog({ logString: logData, color: isError ? colors.background_red : colors.bold, options: localConfiguration })}`;

        // eslint-disable-next-line no-console
        console[isError ? `log` : `error`](logData);
    }
}

export {
    logWriter as LogWriter,
};
