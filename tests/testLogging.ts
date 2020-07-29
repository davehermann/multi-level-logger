import { expect } from "chai";
import * as logger from "../lib/logger";

function setLevel(level): void {
    describe(`Logger set to ${JSON.stringify(level)}`, function() {
        before(function() {
            logger.InitializeLogging({ logLevel: level });
        });

        timestampTests(level);
    });
}

function timestampTests(level, namedLog?) {
    describe(`Output without timestamp`, function() {
        before(`Turn off timestamp`, function() {
            logger.OutputFormatting({ includeTimestamp: false, includeCodeLocation: false });
        });

        logLevelTests(level, namedLog);
    });

    describe(`Output including timestamp`, function() {
        before(`Turn on timestamp`, function() {
            logger.OutputFormatting({ includeTimestamp: true, includeCodeLocation: false });
        });

        logLevelTests(level, namedLog);
    });
}

function logLevelTests(currentLevel, namedLog) {
    describe(`Level output`, function() {
        outputLog(`Dev`, currentLevel, namedLog);
        // outputLog(`Trace`, currentLevel, namedLog);
        // outputLog(`Debug`, currentLevel, namedLog);
        // outputLog(`Info`, currentLevel, namedLog);
        // outputLog(`Warn`, currentLevel, namedLog);
        // outputLog(`Err`, currentLevel, namedLog);
        // outputLog(`Fatal`, currentLevel, namedLog);
        // outputLog(`Log`, currentLevel, namedLog);
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

    let aboveLevel, useOutput;

    // Writing to "Log" always writes
    if (levelName == `Log`) {
        aboveLevel = true;
        useOutput = `log`;
    } else {
        const mapLevelName = (levelName == `Err` ? `Error` : levelName),
            logLevelNumber = logger.LogLevels[mapLevelName.toLowerCase()],
            loggingThreshold = (typeof currentLevel == `string` ? logger.LogLevels[currentLevel.toLowerCase()] : currentLevel);

        useOutput = (logLevelNumber >= <keyof typeof logger.LogLevels>`error` ? `error` : `log`);
        aboveLevel = (logLevelNumber >= loggingThreshold);
    }

    it(`should${aboveLevel ? `` : ` not`} output ${asString ? `a string` : `an object`} to console.${useOutput}`, function() {
        const logString = `${levelName} level`,
            logObject = { level: levelName };

        // Get the timestamp at the moment the log is written
        const timestamp = new Date();
        // Write to the log
        logger[levelName](asString ? logString : logObject, { logName: namedLog, configuration: { useColors: false } });

        if (aboveLevel) {
            // Confirm that the log was called exactly once
            // eslint-disable-next-line no-console
            expect(console[useOutput].calledOnce).to.be.true;

            // Confirm the log contents

            // Match the log text data generation
            const dateDisplay = timestamp.toLocaleString();
            let logText: string = asString ? logString : JSON.stringify(logObject, null, 4);
            if (logger.GetConfiguredLogging().includeTimestamp)
                logText = `${dateDisplay} - ${logText.replace(/\n/g, (`\n`).padEnd(dateDisplay.length + 4, ` `))}`;
            // Strip any color codes from the log

            // eslint-disable-next-line no-console
            expect(console[useOutput].calledWith(logText)).to.be.true;
        } else
            // No logging should have occurred
            // eslint-disable-next-line no-console
            expect(console[useOutput].notCalled).to.be.true;
    });
}

export {
    setLevel as SetLogLevel,
};
