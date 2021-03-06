import { IAdditionalData, IAdditionalDataDisplay, ILogOptionConfiguration, ILog, IStackTraceObject, ILogColor } from "./interfaces";
import { levels, colors } from "./levels";
import tLogObject from "./types";

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
        return !!fileName ? (fileName.indexOf(`/multi-level-logger/`) < 0) && (fileName.indexOf(`/node_modules/`) < 0) : false;
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

        if (isError && (mergedData.length > 0))
            mergedData = colorLog({ logString: mergedData, options, color: colors.brightRed });
    }

    return mergedData;
}

function logWriter(data: tLogObject, { configuration, messageLevel, options = {} }: ILog): void {
    const isError = messageLevel >= levels.error,
        { configuration: configurationOverride = {}, noFunctionEval } = options;
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

    if (!logName || (configuration.logLevel[logName] === undefined))
        logName = `default`;

    // Any log level below 0 means always write the log data
    if ((configuration.logLevel[logName] <= messageLevel) || (messageLevel < 0)) {
        // Handle functions as data
        if ((typeof data === `function`) && !noFunctionEval) {
            // Use the return value of the function
            data = data();
        }

        const useRawData = asIs || (typeof data !== `object`);
        let logData: string;
        if (useRawData) {
            if (typeof data === `string`)
                logData = data;
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            else if (!!(data as any).stack)
                // Handle errors using the stack trace
                logData = (data as Error).stack;
            else
                // Catch anything else and convert to a string
                logData = data.toString();
        } else
            logData = JSON.stringify(data, null, localConfiguration.jsonFormatter);

        // Handle timestamp and code location
        const additionalData: Array<IAdditionalData> = [];
        let additionalDataLength = 0;

        if (localConfiguration.includeTimestamp) {
            const timestamp = new Date(),
                dateDisplay = timestamp.toLocaleString();

            additionalData.push({ text: dateDisplay, color: colors.brightBlue });
            additionalDataLength += dateDisplay.length;
        }

        if (localConfiguration.includeCodeLocation) {
            const [functionName, functionLocation] = reportLineNumber();

            const codeLocationData: IAdditionalData = {text: []};
            if (functionName !== `null()`) {
                (codeLocationData.text as Array<IAdditionalData>).push({ text: functionName, color:  colors.brightYellow });
                additionalDataLength += functionName.length;
            }

            (codeLocationData.text as Array<IAdditionalData>).push({ text: functionLocation, color: colors.green });
            additionalDataLength += functionLocation.length;

            additionalData.push(codeLocationData);
        }

        let displayData = displayAdditionalData({ additionalData, options: localConfiguration, isError });

        // Check for inclusion of additional data
        if (displayData.length > 0)
            // Always display the data on a new line when code location is included
            displayData += (localConfiguration.includeCodeLocation && !useRawData ? `\n` : ` - `);

        if (!useRawData) {
            const dataLength: number = additionalDataLength + (displayData.length > 0 ? 4 : 0);

            logData = logData.replace(/\n/g, (`\n`).padEnd(localConfiguration.includeCodeLocation ? 6 : dataLength, ` `));
            if (localConfiguration.includeCodeLocation)
                logData = `     ${logData}`;
        }

        logData = `${displayData}${colorLog({ logString: logData, color: isError ? colors.background_red : colors.bold, options: localConfiguration })}`;

        // eslint-disable-next-line no-console
        console[isError ? `error` : `log`](logData);
    }
}

export default logWriter;
