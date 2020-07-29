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
function testStringThresholdViaObject(): void {
    const useLevel = getRandomLogLevelByName();

    describe(`Test 3) Set log threshold to "${useLevel}" via an object`, function() {
        SetLogLevel({ logLevel: useLevel });
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
function testMultipleLogs():void {
    const logLevels: ILogDefinition = {
        logLevel: randomlySelectStringOrNumericalLevel(),
        log1: { logLevel: randomlySelectStringOrNumericalLevel() },
        // log2: { logLevel: randomlySelectStringOrNumericalLevel() }
    };

    describe(`Test 5) Test multiple logs with different thresholds`, function() {
        SetMulitpleLogLevels(logLevels);
    });
}

function randomlySelectStringOrNumericalLevel(): string | number {
    return (Math.random() >= 0.5) ? getRandomLogLevelByName() : getRandomLogThresholdWithinLogRange();
}


/** Get a random numeric log level to display */
function getRandomLogThresholdWithinLogRange(): number {
    return Math.round(Math.random() * (LogLevels.fatal - LogLevels.dev)) + LogLevels.dev;
}

/** Get a random log level name from the configured names */
function getRandomLogLevelByName(): string {
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
