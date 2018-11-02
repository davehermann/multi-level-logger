// Application Modules
const { SetLogLevel } = require(`./outputs`),
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
    // Select a random test level
    let levelNames = Object.keys(LogLevels),
        testLevel = Math.round(Math.random() * levelNames.length);

    describe(`Test 3) Set log threshold to "${levelNames[testLevel]}" via an object`, function() {
        SetLogLevel({ logLevel: levelNames[testLevel] });
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

function getRandomLogThresholdWithinLogRange() {
    return Math.round(Math.random() * (LogLevels.fatal - LogLevels.dev)) + LogLevels.dev;
}

module.exports.Test1 = presetLogLevels;
module.exports.Test2 = testRandomNumberLevel;
module.exports.Test3 = testStringThresholdViaObject;
module.exports.Test4 = testIntegerThresholdViaObject;
