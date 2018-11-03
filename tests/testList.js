// Application Modules
const { SetLogLevel, SetMulitpleLogLevels } = require(`./outputs`),
    { LogLevels } = require(`../logger`);

// Test 1) Test each preset log level set via string
function presetLogLevels() {
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

// Test 2) Set a random integer level (between level.dev and level.fatal)
function testRandomNumberLevel() {
    // Get a random number in the range, and adjust by the Dev level in case that level ever becomes non-zero
    let testLevel = getRandomLogThresholdWithinLogRange();

    describe(`Test 2) Set log threshold to ${testLevel}`, function() {
        SetLogLevel(testLevel);
    });
}

// Test 3) Set via object with a string
function testStringThresholdViaObject() {
    let useLevel = getRandomLogLevel();

    describe(`Test 3) Set log threshold to "${useLevel}" via an object`, function() {
        SetLogLevel({ logLevel: useLevel });
    });
}

// Test 4) Set via object with an integer
function testIntegerThresholdViaObject() {
    // Select a random test level
    let testLevel = getRandomLogThresholdWithinLogRange();

    describe(`Test 4) Set log threshold to ${testLevel} via an object`, function() {
        SetLogLevel({ logLevel: testLevel });
    });
}

// Test 5) Multiple logs set via object with string or integer values
function testMultipleLogs() {
    let logLevels = {
        logLevel: randomlySelectStringOrNumericalLevel(),
        log1: { logLevel: randomlySelectStringOrNumericalLevel() },
        log2: { logLevel: randomlySelectStringOrNumericalLevel() }
    };

    describe(`Test 5) Test multiple logs with different thresholds`, function() {
        SetMulitpleLogLevels(logLevels);
    });
}

function randomlySelectStringOrNumericalLevel() {
    return (Math.random() >= 0.5) ? getRandomLogLevel() : getRandomLogThresholdWithinLogRange();
}

function getRandomLogThresholdWithinLogRange() {
    return Math.round(Math.random() * (LogLevels.fatal - LogLevels.dev)) + LogLevels.dev;
}

function getRandomLogLevel() {
    // Select a random test level
    let levelNames = Object.keys(LogLevels),
        testLevel = Math.round(Math.random() * (levelNames.length - 1));

    return levelNames[testLevel];
}

module.exports.Test1 = presetLogLevels;
module.exports.Test2 = testRandomNumberLevel;
module.exports.Test3 = testStringThresholdViaObject;
module.exports.Test4 = testIntegerThresholdViaObject;
module.exports.Test5 = testMultipleLogs;
