// Log levels
const levels = {
    dev: 0,
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
};

// Default logging is set to warn
let _logLevel = { default: levels[`warn`] },
    _includeTimestamp = true;

/*
    logDefinition is one of the following:
    1) a string matching a log level in the levels object
    2) an integer value to use as the log level
    3) an object with a _logLevel property
        a) with a string value matching the level name
        b) with an integer value to use as the log level
    4) an object with each key matching a log name, and each value one of 1, 2, or 3 above
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

function setTimestamp(prependTs = true) {
    _includeTimestamp = prependTs;
}

// Get the current log settings
function currentLogging() {
    return { logLevel: _logLevel, includeTimestamp: _includeTimestamp };
}

// Write the log entry
// data - the log data to write
// asIs - A javascript object will default to JSON output. Passing in `true` will force writing of the native object
function writeLog(logLevelId, data, asIs, logName) {
    let messageLevel = levels[logLevelId];

    if (typeof asIs == `string`) {
        logName = asIs;
        asIs = undefined;
    }

    if (!logName)
        logName = `default`;

    if (_logLevel[logName] <= messageLevel) {
        let useRawData = asIs || (typeof data !== `object`),
            logData = (useRawData ? data : JSON.stringify(data, null, 4));

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

// Development-only level (Not recommended)
function dev(data, asIs, logName) { writeLog(`dev`, data, asIs, logName); }

// Trace-level
function trace(data, asIs, logName) { writeLog(`trace`, data, asIs, logName); }

// Debug-level
function debug(data, asIs, logName) { writeLog(`debug`, data, asIs, logName); }

// Info-level
function info(data, asIs, logName) { writeLog(`info`, data, asIs, logName); }

// Warn level
function warn(data, asIs, logName) { writeLog(`warn`, data, asIs, logName); }

// Error-level
function err(data, asIs, logName) { writeLog(`error`, data, asIs, logName); }

// Fatal-level
function fatal(data, asIs, logName) { writeLog(`fatal`, data, asIs, logName); }

module.exports.LogLevels = levels;
module.exports.InitializeLogging = initialize;
module.exports.IncludeTimestamp = setTimestamp;
module.exports.GetConfiguredLogging = currentLogging;

module.exports.Dev = dev;
module.exports.Trace = trace;
module.exports.Debug = debug;
module.exports.Info = info;
module.exports.Warn = warn;
module.exports.Err = err;
module.exports.Fatal = fatal;
