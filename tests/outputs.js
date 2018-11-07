// NPM Modules
const expect = require(`chai`).expect;

// Application Modules
const logger = require(`../logger`);

function setLevel(level) {
    describe(`Logger set to ${JSON.stringify(level)}`, function() {
        before(function() {
            logger.InitializeLogging(level);
        });

        timestampTests(level);
    });
}

function setMultipleLevels(levels) {
    describe(`Logger set with multiple levels ${JSON.stringify(levels)}`, function() {
        before(function() {
            logger.InitializeLogging(levels);
        });

        for (let prop in levels)
            if (prop == `logLevel`)
                describe(`Checking default logs set to "${levels[prop]}"`, function() {
                    timestampTests(levels);
                });
            else
                describe(`Checking named log "${prop}" set as ${JSON.stringify(levels[prop])}`, function() {
                    timestampTests(levels[prop], prop);
                });
    });
}

function timestampTests(level, namedLog) {
    describe(`Output without timestamp`, function() {
        before(`Turn off timestamp`, function() {
            logger.IncludeTimestamp(false);
        });

        logLevelTests(level, namedLog);
    });

    describe(`Output including timestamp`, function() {
        before(`Turn on timestamp`, function() {
            logger.IncludeTimestamp(true);
        });

        logLevelTests(level, namedLog);
    });
}

function logLevelTests(currentLevel, namedLog) {
    describe(`Level output`, function() {
        outputLog(`Dev`, currentLevel, namedLog);
        outputLog(`Trace`, currentLevel, namedLog);
        outputLog(`Debug`, currentLevel, namedLog);
        outputLog(`Info`, currentLevel, namedLog);
        outputLog(`Warn`, currentLevel, namedLog);
        outputLog(`Err`, currentLevel, namedLog);
        outputLog(`Fatal`, currentLevel, namedLog);
    });
}

function outputLog(levelName, currentLevel, namedLog) {
    describe(`${levelName} output`, function() {
        writeLog(levelName, true, currentLevel, namedLog);
        writeLog(levelName, false, currentLevel, namedLog);
    });
}

function writeLog(levelName, asString, currentLevel, namedLog) {
    // When currentLevel is an object, use the logLevel property
    if (typeof currentLevel == `object`) {
        currentLevel = currentLevel.logLevel;
    }

    let mapLevelName = (levelName == `Err` ? `Error` : levelName),
        logLevelNumber = logger.LogLevels[mapLevelName.toLowerCase()],
        useOutput = (logLevelNumber >= logger.LogLevels[`error`] ? `error` : `log`),
        loggingThreshold = (typeof currentLevel == `string` ? logger.LogLevels[currentLevel.toLowerCase()] : currentLevel);
    let aboveLevel = (logLevelNumber >= loggingThreshold);

    it(`should${aboveLevel ? `` : ` not`} output ${asString ? `a string` : `an object`} to console.${useOutput}`, function() {
        let logData = asString ? `${levelName} level` : { level: levelName };

        // Get the timestamp at the moment the log is written
        let timestamp = new Date();
        // Write to the log
        logger[levelName](logData, undefined, namedLog);

        if (aboveLevel) {
            // Confirm that the log was called exactly once
            // eslint-disable-next-line no-console
            expect(console[useOutput].calledOnce).to.be.true;

            // Confirm the log contents

            // Match the log text data generation
            let dateDisplay = timestamp.toLocaleString(),
                logText = asString ? logData : JSON.stringify(logData, null, 4);
            if (logger.GetConfiguredLogging().includeTimestamp)
                logText = `${dateDisplay} - ${logText.replace(/\n/g, (`\n`).padEnd(dateDisplay.length + 4, ` `))}`;

            // eslint-disable-next-line no-console
            expect(console[useOutput].calledWith(logText)).to.be.true;
        } else
            // No logging should have occurred
            // eslint-disable-next-line no-console
            expect(console[useOutput].notCalled).to.be.true;
    });
}

module.exports.SetLogLevel = setLevel;
module.exports.SetMulitpleLogLevels = setMultipleLevels;
