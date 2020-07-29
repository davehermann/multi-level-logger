import { Test1, Test2 } from "./testList";
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
    // Test3();
    // Test4();
    // Test5();
});
