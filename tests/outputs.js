// NPM Modules
const expect = require(`chai`).expect;

// Application Modules
const logger = require(`../logger`);

function setLevel(level) {
    describe(`Logger set to "${level}"`, function() {
        before(function() {
            logger.InitializeLogging(level);
        });

        describe(`Output without timestamp`, function() {
            before(`Turn off timestamp`, function() {
                logger.IncludeTimestamp(false);
            });

            logLevelTests(level);
        });

        describe(`Output including timestamp`, function() {
            before(`Turn on timestamp`, function() {
                logger.IncludeTimestamp(true);
            });

            logLevelTests(level);
        });
    });
}

function logLevelTests(currentLevel) {
    describe(`Level output`, function() {
        outputLog(`Dev`, currentLevel);
        outputLog(`Trace`, currentLevel);
        outputLog(`Debug`, currentLevel);
        outputLog(`Info`, currentLevel);
        outputLog(`Warn`, currentLevel);
        outputLog(`Err`, currentLevel);
        outputLog(`Fatal`, currentLevel);
    });
}

function outputLog(levelName, currentLevel) {
    describe(`${levelName} output`, function() {
        writeLog(levelName, true, currentLevel);
        writeLog(levelName, false, currentLevel);
    });
}

function writeLog(levelName, asString, currentLevel) {
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
        logger[levelName](logData);

        if (aboveLevel) {
            // Confirm that the log was called exactly once
            expect(console[useOutput].calledOnce).to.be.true;

            // Confirm the log contents

            // Match the log text data generation
            let dateDisplay = timestamp.toLocaleString(),
                logText = asString ? logData : JSON.stringify(logData, null, 4);
            if (logger.GetConfiguredLogging().includeTimestamp)
                logText = `${dateDisplay} - ${logText.replace(/\n/g, (`\n`).padEnd(dateDisplay.length + 4, ` `))}`;

            expect(console[useOutput].calledWith(logText)).to.be.true;
        } else
            // No logging should have occurred
            expect(console[useOutput].notCalled).to.be.true;
    });
}

module.exports.SetLogLevel = setLevel;
