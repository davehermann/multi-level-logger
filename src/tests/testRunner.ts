import { Test1, Test2, Test3, Test4, Test5 } from "./testList";
import * as sinon from "sinon";


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
    if (runTest(1)) Test1();
    if (runTest(2)) Test2();
    if (runTest(3)) Test3();
    if (runTest(4)) Test4();
    if (runTest(5)) {
        Test5();
        // Repeat test 5 with a fixed level of WARN and sub-log level of DEV
        Test5(`warn`, `dev`);
    }

    // Repeat test 3 with colors
    if (runTest(6)) Test3(6, true, false, true);
    // Repeat test 3 with code location instead of timestamp
    if (runTest(7)) Test3(7, false, true);
    // Repeat test 7 with colors
    if (runTest(8)) Test3(8, false, true, true);
    // Repeat test 3 with both timestamp and code location
    if (runTest(9)) Test3(9, true, true);
    // Repeat test 9 with colors
    if (runTest(10)) Test3(10, true, true, true);
});

function runTest(testNumber: number) {
    if (!!process.env.TEST_LIST) {
        const tests = process.env.TEST_LIST.split(`,`).map(id => +id);
        return tests.indexOf(testNumber) >= 0;
    }

    return true;
}
