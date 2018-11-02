// Application Modules
const { SetLogLevel } = require(`./outputs`);

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

module.exports.Test1 = presetLogLevels;
