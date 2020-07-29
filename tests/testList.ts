import { LogLevels } from "../lib/logger";
import { SetLogLevel } from "./testLogging";

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

function getRandomLogThresholdWithinLogRange(): number {
    return Math.round(Math.random() * (LogLevels.fatal - LogLevels.dev)) + LogLevels.dev;
}


export {
    presetLogLevels as Test1,
    testRandomNumberLevel as Test2,
};
