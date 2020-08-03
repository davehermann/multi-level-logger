import { Log, OutputFormatting } from "../lib/logger";

function devTests(): void {
    const testObject = {
            fox: {
                stats: [`quick`, `brown`],
                action: `jumped over`
            },
            dog: `lazy`
        },
        // Build the string from the object
        testString = `The ${testObject.fox.stats.join(` `)} fox ${testObject.fox.action} the ${testObject.dog} dog`;

    // Log a string
    // eslint-disable-next-line no-console
    console.log(`-- Test 1: Log a string --`);
    Log(testString);

    // Log an object
    // eslint-disable-next-line no-console
    console.log(`\n-- Test 2: Log an object --`);
    Log(testObject);

    // Log without a timestamp
    OutputFormatting({ includeTimestamp: false });
    // eslint-disable-next-line no-console
    console.log(`\n-- Test 3: Log without a timestamp --`);
    Log(testString);

    // Log without a timestamp, and with object spacing of 2
    OutputFormatting({ includeTimestamp: false, jsonFormatter: 2 });
    // eslint-disable-next-line no-console
    console.log(`\n-- Test 4: Log without a timestamp, and with object spacing of 2 --`);
    Log(testObject);

    // Log without a timestamp, and with no spacing in the object
    OutputFormatting({ includeTimestamp: false, jsonFormatter: 0 });
    // eslint-disable-next-line no-console
    console.log(`\n-- Test 5: Log without a timestamp, and with no spacing in the object --`);
    Log(testObject);

    // Log with a timestamp, and without code location
    OutputFormatting({ includeTimestamp: true, includeCodeLocation: false, jsonFormatter: 4 });
    // eslint-disable-next-line no-console
    console.log(`\n-- Test 6: Log without a code location --`);
    Log(testObject);

    // Log without colors, using an in-line configuration
    // eslint-disable-next-line no-console
    console.log(`\n-- Test 7: Log without colors, using an in-line configuration --`);
    Log(testObject, { configuration: { useColors: false } });

    // Log without colors, using an in-line configuration, and add code location back in
    // eslint-disable-next-line no-console
    console.log(`\n-- Test 7: Log without colors, using an in-line configuration, and add code location back in --`);
    Log(testObject, { configuration: { useColors: false, includeCodeLocation: true } });
}

export {
    devTests as DevTests,
};
