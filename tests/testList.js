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
    let testLevel = Math.round(Math.random() * (LogLevels.fatal - LogLevels.dev)) + LogLevels.dev;

    describe(`Test 2) Set log threshold to ${testLevel}`, function() {
        SetLogLevel(testLevel);
    });
}

module.exports.Test1 = presetLogLevels;
module.exports.Test2 = testRandomNumberLevel;
