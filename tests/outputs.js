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
        useOutput = (logLevelNumber >= logger.LogLevels[`error`] ? `error` : `log`);
    let aboveLevel = (logLevelNumber >= logger.LogLevels[currentLevel.toLowerCase()]);

    it(`should${aboveLevel ? `` : ` not`} output ${asString ? `a string` : `an object`} to console.${useOutput}`, function() {
        logger[levelName](asString ? `${levelName} level` : { level: levelName });
        if (aboveLevel)
            expect(console[useOutput].calledOnce).to.be.true;
        else
            expect(console[useOutput].notCalled).to.be.true;
    });
}

module.exports.SetLogLevel = setLevel;
