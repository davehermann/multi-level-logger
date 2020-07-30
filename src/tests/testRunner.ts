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
    Test1();
    Test2();
    Test3();
    Test4();
    Test5();

    // Repeat test 3 with colors
    Test3(6, true, false, true);
    // Repeat test 3 with code location instead of timestamp
    Test3(7, false, true);
    // Repeat test 7 with colors
    Test3(8, false, true, true);
    // Repeat test 3 with both timestamp and code location
    Test3(9, true, true);
    // Repeat test 9 with colors
    Test3(10, true, true, true);
});
