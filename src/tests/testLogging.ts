import { expect } from "chai";
import * as logger from "../lib/logger";
import { ILogDefinition } from "../lib/interfaces";

/**
 * Set the log level to use
 * @param level - Level name, number or object definition
 */
function setLevel(level: string | number | ILogDefinition): void {
    describe(`Logger set to ${JSON.stringify(level)}`, function() {
        before(function() {
            logger.InitializeLogging(level);
            logger.OutputFormatting({ useColors: false });
        });

        timestampTests(level);
    });
}

/**
 * Set log levels to use for multiple named logs, and default
 * @param levels - Levels definition object
 */
function setMultipleLevels(levels: ILogDefinition): void {
    describe(`Logger set with multiple levels ${JSON.stringify(levels)}`, function() {
        before(function() {
            logger.InitializeLogging(levels);
            logger.OutputFormatting({ useColors: false });
        });

        for (const prop in levels)
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

/**
 * Test logging without, and with, a timestamp
 * @param level - Level name, number or object definition
 * @param namedLog - name of log when not using "default" log
 */
function timestampTests(level: string | number | ILogDefinition, namedLog?: string): void {
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

/**
 * Test for log output using each level of logging
 * @param currentLevel - Level name, number or object definition
 * @param namedLog - name of log when not using "default" log
 */
function logLevelTests(currentLevel: string | number | ILogDefinition, namedLog: string) {
    describe(`Level output`, function() {
        outputLog(`Dev`, currentLevel, namedLog);
        outputLog(`Trace`, currentLevel, namedLog);
        outputLog(`Debug`, currentLevel, namedLog);
        outputLog(`Info`, currentLevel, namedLog);
        outputLog(`Warn`, currentLevel, namedLog);
        outputLog(`Err`, currentLevel, namedLog);
        outputLog(`Fatal`, currentLevel, namedLog);
        outputLog(`Log`, currentLevel, namedLog);
    });
}

/**
 * Write the data logged first as a string, and then as an object
 * @param levelName - The level to use when writing the log
 * @param currentLevel - Level name, number or object definition
 * @param namedLog - name of log when not using "default" log
 */
function outputLog(levelName: string, currentLevel: string | number | ILogDefinition, namedLog: string) {
    const levelNumber = mapLevelNameToLevel(levelName) ?? `N/A`;
    describe(`${levelName} [${levelNumber}] output`, function() {
        writeLog(levelName, true, currentLevel, namedLog);
        writeLog(levelName, false, currentLevel, namedLog);
    });
}

/**
 * Get the LogLevels enumeration value from the level name
 * @param levelName - The log level to use
 */
function mapLevelNameToLevel(levelName: string): logger.LogLevels {
    const mapLevelName = (levelName == `Err` ? `Error` : levelName);
    return logger.LogLevels[mapLevelName.toLowerCase()];
}

/**
 * Type Guard check for the level as an instance of ILogDefinition
 * @param level - The log level to use
 */
function isILogDefinition(level: string | number | ILogDefinition): level is ILogDefinition {
    return (level as ILogDefinition).logLevel !== undefined;
}

/**
 * Write the log to the console, or not if below log level, and check for expected behavior
 * @param levelName - The level to use when writing the log
 * @param asString - Pass objects as string instead of directly as an object
 * @param currentLevel - Log level used for displaying the log
 * @param namedLog - name of log when not using "default" log
 */
function writeLog(levelName: string, asString: boolean, currentLevel: string | number | ILogDefinition, namedLog: string) {
    // When currentLevel is an object, use the logLevel property
    if (isILogDefinition(currentLevel))
        currentLevel = currentLevel.logLevel;

    let aboveLevel: boolean, useOutput: string;

    // Writing to "Log" always writes
    if (levelName == `Log`) {
        aboveLevel = true;
        useOutput = `log`;
    } else {
        const logLevelNumber: number = mapLevelNameToLevel(levelName),
            loggingThreshold: number = (typeof currentLevel == `string` ? logger.LogLevels[currentLevel.toLowerCase()] : currentLevel);

        useOutput = (logLevelNumber >= logger.LogLevels.error ? `error` : `log`);
        aboveLevel = (logLevelNumber >= loggingThreshold);
    }

    it(`should${aboveLevel ? `` : ` not`} output ${asString ? `a string` : `an object`} to console.${useOutput}`, function() {
        const logString = `${levelName} level`,
            logObject = { level: levelName };

        // Get the timestamp at the moment the log is written
        const timestamp = new Date();
        // Write to the log, specifying asIs == false to properly handle object testing with error and fatal levels
        logger[levelName](asString ? logString : logObject, { logName: namedLog, asIs: false });

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
    setMultipleLevels as SetMulitpleLogLevels,
};
