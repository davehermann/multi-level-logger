import { LogLevels } from "../lib/logger";
import { ILogDefinition } from "../lib/interfaces";
import { SetLogLevel, SetMulitpleLogLevels } from "./testLogging";

/** Test 1) Test each preset log level set via string level identifier */
function presetLogLevels(): void {
    describe(`Test 1) Each set level from Dev to Fatal via string`, function() {
        SetLogLevel(`Dev`);
        SetLogLevel(`Trace`);
        SetLogLevel(`Debug`);
        SetLogLevel(`Info`);
        SetLogLevel(`Warn`);
        SetLogLevel(`Error`);
        SetLogLevel(`Fatal`);
    });
}

/** Test 2) Set a random integer level (between level.dev and level.fatal) */
function testRandomNumberLevel(): void {
    // Get a random number in the range, and adjust by the Dev level in case that level ever becomes non-zero
    const testLevel = getRandomLogThresholdWithinLogRange();

    describe(`Test 2) Set log threshold to ${testLevel}`, function() {
        SetLogLevel(testLevel);
    });
}

/** Test 3) Set via object with a random named level */
function testStringThresholdViaObject(testNumber = 3, showTimestamp = true, showCodeLocation = false, useColors = false): void {
    const useLevel = getRandomLogLevelByName();

    const description = [`Test ${testNumber}) Set log threshold to "${useLevel}" via an object`];
    if (showTimestamp)
        description.push(`and include timestamp in logs`);
    if (showCodeLocation)
        description.push(`and include code location in logs`);
    if (useColors)
        description.push(`and colorize`);

    describe(description.join(`, `), function() {
        SetLogLevel({ logLevel: useLevel }, showTimestamp, showCodeLocation, useColors);
    });
}

/** Test 4) Set via object with a random integer level */
function testIntegerThresholdViaObject(): void {
    // Select a random test level
    const testLevel = getRandomLogThresholdWithinLogRange();

    describe(`Test 4) Set log threshold to ${testLevel} via an object`, function() {
        SetLogLevel({ logLevel: testLevel });
    });
}

/** Test 5) Multiple logs set via object with string or integer values */
function testMultipleLogs(logLevel?: string, subLogLevel?: string):void {
    const logLevels: ILogDefinition = {
        logLevel: logLevel ?? randomlySelectStringOrNumericalLevel(),
        log1: { logLevel: subLogLevel ?? randomlySelectStringOrNumericalLevel() },
        // log2: { logLevel: randomlySelectStringOrNumericalLevel() }
    };

    describe(`Test 5${!!logLevel || !!subLogLevel ? ` - using fixed log levels` : ``}) Test multiple logs with different thresholds`, function() {
        SetMulitpleLogLevels(logLevels);
    });
}

function manuallySetLevel(expectNumericalValue?: boolean) {
    // If an environment variable is set
    if (!!process.env.TEST_LEVEL) {
        // Try to use a log level name
        const levelToUse = LogLevels[process.env.TEST_LEVEL];

        if (levelToUse !== undefined)
            return expectNumericalValue ? levelToUse : process.env.TEST_LEVEL.toLowerCase();

        if (expectNumericalValue) {
            // Try to parse a number
            const levelNumber = parseInt(process.env.TEST_LEVEL);
            if (levelNumber !== NaN)
                return levelNumber;
        }
    }

    return null;
}

function randomlySelectStringOrNumericalLevel(): string | number {
    return (Math.random() >= 0.5) ? getRandomLogLevelByName() : getRandomLogThresholdWithinLogRange();
}


/** Get a random numeric log level to display */
function getRandomLogThresholdWithinLogRange(): number {
    return (manuallySetLevel(true) as number) ?? Math.round(Math.random() * (LogLevels.fatal - LogLevels.dev)) + LogLevels.dev;
}

/** Get a random log level name from the configured names */
function getRandomLogLevelByName(): string {
    const manualLevel = manuallySetLevel();
    if (!!manualLevel)
        return (manualLevel as string);

    // Select a random test level
    const levelNames: Array<string> = [];

    for (const name in LogLevels)
        if (typeof LogLevels[name] === `number`)
            levelNames.push(name);

    const testLevel = Math.round(Math.random() * (levelNames.length - 1));

    return levelNames[testLevel];
}


export {
    presetLogLevels as Test1,
    testRandomNumberLevel as Test2,
    testStringThresholdViaObject as Test3,
    testIntegerThresholdViaObject as Test4,
    testMultipleLogs as Test5,
};
