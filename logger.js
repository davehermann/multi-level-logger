/**
 * Available log levels
 */
const levels = {
    dev: 0,
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};

/**
 * By default
 * Log level is WARN
 * Timestamp is included
 * JSON formatting uses 4 spaces
 */
let _logLevel = { default: levels[`warn`] },
    _includeTimestamp = true,
    _jsonFormatter = 4;

/**
 * Initial logging configuration
 * @param {String|Number|Object} logDefinition - The log level initializer matching one of four types
 *      1. *String* - a string matching a log level in the levels object
 *      1. *Number* - an integer value to use as the log level
 *      1. *Object* - an object with a `logLevel` property, matching 1 or 2 above
 *      1. *Object* - an object with each key matching a named log, and the value as 1, 2, or 3 above
 * @param {String} logName - Name of the log, defaulting to "default"
 */
function initialize(logDefinition, logName = `default`) {
    switch (typeof logDefinition) {
        case `string`:
            _logLevel[logName] = levels[logDefinition.toLowerCase()];
            break;

        case `number`:
            // Warn for numbers above fatal, and set to fatal-level
            // Anything below dev can remain as-is since it will write to all logs
            if (logDefinition > levels.fatal)
                // eslint-disable-next-line no-console
                console.log(`Log level "${logDefinition}" is above the highest log level of "fatal" (${levels.fatal}), and will be set to "${levels.fatal}"`);

            _logLevel[logName] = Math.min(logDefinition, levels.fatal);
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
 * @param {Boolean} prependTs - Include a timestamp before all logged entries
 * @param {Number} jsonIndent - Number of spaces to pass to `JSON.stringify()`
 */
function outputFormatting(prependTs = true, jsonIndent = 4) {
    _includeTimestamp = prependTs;
    _jsonFormatter = jsonIndent;
}

/**
 * Include a timestamp in the logged message
 *   + **Deprecated** - will be removed in a future version
 *   + Use `OutputFormatting()` instead
 * @param {Boolean} prependTs
 */
function includeTimestamp(prependTs = true) {
    outputFormatting(prependTs);
}

/**
 * Get the current log settings
 */
function currentLogging() {
    return { logLevel: _logLevel, includeTimestamp: _includeTimestamp, jsonSpacing: _jsonFormatter };
}

/**
 * Write the log entry
 * @param {String|Number} logLevelId - ID level of the log (anything less than zero always writes)
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function writeLog(logLevelId, data, asIs, logName) {
    let messageLevel = levels[logLevelId];

    // For the always-write "Log" level, there will be no message level defined
    if (messageLevel === undefined)
        messageLevel = logLevelId;

    if (typeof asIs == `string`) {
        logName = asIs;
        asIs = undefined;
    }

    if (!logName)
        logName = `default`;

    // Any log level below 0 means always write the log data
    if ((_logLevel[logName] <= messageLevel) || (messageLevel < 0)) {
        let useRawData = asIs || (typeof data !== `object`),
            logData = (useRawData ? data : JSON.stringify(data, null, _jsonFormatter));

        if (_includeTimestamp) {
            let timestamp = new Date(),
                dateDisplay = timestamp.toLocaleString();

            if (useRawData)
                logData = `${dateDisplay} - ${logData}`;
            else
                logData = `${dateDisplay} - ${logData.replace(/\n/g, (`\n`).padEnd(dateDisplay.length + 4, ` `))}`;
        }

        // eslint-disable-next-line no-console
        console[messageLevel < levels.error ? `log` : `error`](logData);
    }
}

/**
 * Development-level logs; lowest named level; equivalent to 0
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function dev(data, asIs, logName) { writeLog(`dev`, data, asIs, logName); }

/**
 * Trace-level; equivalent to 10
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function trace(data, asIs, logName) { writeLog(`trace`, data, asIs, logName); }

/**
 * Debug-level; equivalent to 20
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function debug(data, asIs, logName) { writeLog(`debug`, data, asIs, logName); }

/**
 * Info-level; equivalent to 30
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function info(data, asIs, logName) { writeLog(`info`, data, asIs, logName); }

/**
 * Warn-level; equivalent to 40
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function warn(data, asIs, logName) { writeLog(`warn`, data, asIs, logName); }

/**
 * Error-level; equivalent to 50
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function err(data, asIs, logName) { writeLog(`error`, data, asIs, logName); }

/**
 * Fatal-level; equivalent to 60
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function fatal(data, asIs, logName) { writeLog(`fatal`, data, asIs, logName); }

// Always write the data, irrespective of level
/**
 * Always write the log data, like a `console.log()` function
 * @param {String|Object} data - Data to write to the log
 * @param {Boolean} [asIs] - Override the conversion of an *Object* to JSON
 * @param {String} [logName] - Name of the log to write to
 */
function alwaysWriteToLog(data, asIs, logName) { writeLog(-1, data, asIs, logName); }

module.exports.LogLevels = levels;
module.exports.InitializeLogging = initialize;
module.exports.OutputFormatting = outputFormatting;
// Deprecated, in favor of .OutputFormatting
module.exports.IncludeTimestamp = includeTimestamp;
module.exports.GetConfiguredLogging = currentLogging;

module.exports.Dev = dev;
module.exports.Trace = trace;
module.exports.Debug = debug;
module.exports.Info = info;
module.exports.Warn = warn;
module.exports.Err = err;
module.exports.Fatal = fatal;
module.exports.Log = alwaysWriteToLog;
