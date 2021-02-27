import { expect } from "chai";
import { colors } from "../lib/levels";
import * as logger from "../lib/logger";
import { ILogDefinition } from "../lib/interfaces";

enum eLogTestType {
    string,
    object,
    function,
    unevaluatedFunction,
}

interface ILogData {
    description: string;
    data: string | unknown | (() => string | unknown);
    expectedResult: string;
}

/**
 * Set the log level to use
 * @param level - Level name, number or object definition
 * @param runTimestamp - Include timestamp in tests
 * @param runCodeLocation - Include code location in tests
 * @param useColors - Show logs with color
 */
function setLevel(level: string | number | ILogDefinition, runTimestamp = true, runCodeLocation = false, useColors = false): void {
    describe(`Logger set to ${JSON.stringify(level)}`, function() {
        before(function() {
            logger.InitializeLogging(level);
            logger.OutputFormatting({ useColors });
        });

        additionalDataTests(level, runTimestamp, runCodeLocation);
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
                    additionalDataTests(levels, true, false);
                });
            else
                describe(`Checking named log "${prop}" set as ${JSON.stringify(levels[prop])}`, function() {
                    additionalDataTests(levels[prop], true, false, prop);
                });
    });
}

/**
 * Test logging without, and with, additional timestamp or code location data
 * @param level - Level name, number or object definition
 * @param includeTimestamp - Test on timestamps
 * @param includeCodeLocation - Test on code location
 * @param namedLog - name of log when not using "default" log
 */

function additionalDataTests(level: string | number | ILogDefinition, includeTimestamp: boolean, includeCodeLocation: boolean, namedLog?: string) {
    let testCondition: string;
    if (includeTimestamp && includeCodeLocation)
        testCondition = `timestamp and code location`;
    else if (includeTimestamp)
        testCondition = `timestamp`;
    else if (includeCodeLocation)
        testCondition = `code location`;

    describe(`Output without ${testCondition}`, function() {
        before(`Turn off ${testCondition}`, function() {
            logger.OutputFormatting({ includeTimestamp: false, includeCodeLocation: false });
        });

        logLevelTests(level, namedLog);
    });

    describe(`Output including ${testCondition}`, function() {
        before(`Turn on ${testCondition}`, function() {
            logger.OutputFormatting({ includeTimestamp, includeCodeLocation });
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
        writeLog(levelName, eLogTestType.string, currentLevel, namedLog);
        writeLog(levelName, eLogTestType.object, currentLevel, namedLog);
        writeLog(levelName, eLogTestType.unevaluatedFunction, currentLevel, namedLog);
        writeLog(levelName, eLogTestType.function, currentLevel, namedLog);
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

function safeColor(fixColor: colors | string): string {
    return fixColor.replace(/\x1b/g, `\\u001b`).replace(/\[/g, `\\[`);
}

/**
 * Get the description for the type of data to be logged
 * @param dataType - Log data type
 */
function logDataInUse(dataType: eLogTestType, levelName: string): ILogData {
    const fEvalData = () => {
        const a = Array.from(Array(10).keys());
        return `${levelName}: [${a.join(`, `)}]`;
    };

    switch (dataType) {
        case eLogTestType.string: {
            const data = `${levelName} level`;
            return { description: `a string`, data, expectedResult: data };
        }

        case eLogTestType.object: {
            const data = { level: levelName };
            return { description: `an object`, data, expectedResult: JSON.stringify(data, null, 4) };
        }

        case eLogTestType.unevaluatedFunction: {
            return { description: `function code`, data: fEvalData, expectedResult: fEvalData.toString() };
        }

        case eLogTestType.function: {
            return { description: `function return value`, data: fEvalData, expectedResult: fEvalData() };
        }
    }
}

/**
 * Write the log to the console, or not if below log level, and check for expected behavior
 * @param levelName - The level to use when writing the log
 * @param asString - Pass objects as string instead of directly as an object
 * @param currentLevel - Log level used for displaying the log
 * @param namedLog - name of log when not using "default" log
 */
function writeLog(levelName: string, dataType: eLogTestType, currentLevel: string | number | ILogDefinition, namedLog: string) {
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

    const { description: dataDescription, data: logData, expectedResult } = logDataInUse(dataType, levelName);

    it(`should${aboveLevel ? `` : ` not`} output ${dataDescription} to console.${useOutput}`, function() {
        // Get the timestamp at the moment the log is written
        const timestamp = new Date();
        // Write to the log, specifying asIs == false to properly handle object testing with error and fatal levels
        logger[levelName](logData, { logName: namedLog, asIs: false, noFunctionEval: (dataType === eLogTestType.unevaluatedFunction) });

        if (aboveLevel) {
            // Confirm the log contents

            const configuration = logger.GetConfiguredLogging();
            let logText: string = expectedResult;

            if (configuration.useColors)
                logText = `${useOutput == `log` ? colors.bold : colors.background_red}${logText}${colors.reset}`;

            if (!configuration.includeTimestamp && !configuration.includeCodeLocation)
                // Confirm that the log was called exactly once with the data formatted as expected
                // eslint-disable-next-line no-console
                expect(console[useOutput].calledOnceWith(logText)).to.be.true;
            else {
                logText = safeColor(logText);

                // Match the log text to timestamp data and code location
                const dateDisplay = timestamp.toLocaleString(),
                    // eslint-disable-next-line no-console
                    loggedData = console[useOutput].firstCall.firstArg;

                // For error logs, pattern is bright red wrapping timestamp or timestamp+code location or code location
                let pattern = `^`;

                if (configuration.useColors && (useOutput == `error`) && (configuration.includeTimestamp || configuration.includeCodeLocation))
                    pattern += safeColor(colors.brightRed);

                if (configuration.includeTimestamp) {
                    if (configuration.useColors && (useOutput == `log`))
                        pattern += `${safeColor(colors.brightBlue)}${dateDisplay}${safeColor(colors.reset)}`;
                    else
                        pattern += dateDisplay;


                    if (configuration.includeCodeLocation)
                        pattern += ` \\- `;
                    else {
                        if (configuration.useColors && (useOutput == `error`))
                            pattern += safeColor(colors.reset);

                        pattern += ` \\- `;

                        switch (dataType) {
                            case eLogTestType.unevaluatedFunction:
                                pattern += logText.replace(/\./g, `\\.`).replace(/\$/g, `\\$`).replace(/\(/g, `\\(`).replace(/\)/g, `\\)`);
                                break;

                            default:
                                pattern += logText.replace(/\n/g, (`\n`).padEnd(dateDisplay.length + 4, ` `));
                                break;
                        }
                    }
                }

                if (configuration.includeCodeLocation) {
                    const codeFunction = `\\w+\\(\\)`,
                        codeFile = `\\[line \\d+: \\S+\\]`;

                    if (configuration.useColors) {
                        if (useOutput == `log`)
                            pattern += `${safeColor(colors.brightYellow)}${codeFunction}${safeColor(colors.reset)} ${safeColor(colors.green)}${codeFile}${safeColor(colors.reset)}`;
                        else
                            pattern += `${codeFunction} ${codeFile}${safeColor(colors.reset)}`;
                    } else
                        pattern += `${codeFunction} ${codeFile}`;

                    switch (dataType) {
                        case eLogTestType.object:
                            // Add five spaces before the first open brace in the JSON object to match log output
                            pattern += `\n${logText.replace(/\{/, `     {`).replace(/\n/g, (`\n`).padEnd(6, ` `))}$`;
                            break;

                        case eLogTestType.unevaluatedFunction:
                            pattern += ` \\- ${logText.replace(/\./g, `\\.`).replace(/\$/g, `\\$`).replace(/\(/g, `\\(`).replace(/\)/g, `\\)`)}`;
                            break;

                        default:
                            pattern += ` \\- ${logText}$`;
                            break;
                    }
                }

                const foundPattern = loggedData.search(new RegExp(pattern));

                // Debugging new log data types
                // if (dataType == eLogTestType.unevaluatedFunction)
                //     console.log({ pattern, loggedData, logText });

                // eslint-disable-next-line no-console
                // expect(console[useOutput].calledOnce).to.be.true;
                expect(foundPattern >= 0).to.be.true;
            }
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
