/*
    Tests
    1) Test each preset log level set via string
    2) Set a random integer level (between level.dev and level.fatal)
    3) Set via object with a string
    4) Set via object with an integer
    5) Multiple logs set via object with string or integer values
        5a) Test for each logger outputing only at its own level

    For each test
        Test all logs from .Dev() to .Fatal(), and confirm no log when below the set level, and one log entry when at or above
            Output without timestamp
                String data
                Object data
            Output with timestamp
                String data
                Object data
*/

// NPM Modules
const sinon = require(`sinon`);

// Application Modules
const { Test1 } = require(`./test1`),
    { Test2 } = require(`./test2`);

describe(`Logger`, function() {
    // Use a sinon spy on console logging for each test
    beforeEach(function() {
        sinon.spy(console, `log`);
        sinon.spy(console, `error`);
    });

    // Clean up sinon after each test
    afterEach(function() {
        sinon.restore();
    });

    // Run Tests
    Test1();
    Test2();
});
