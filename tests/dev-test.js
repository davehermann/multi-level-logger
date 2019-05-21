const logger = require(`../logger`);

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
console.log(`-- Test 1: Log a string --`)
logger.Log(testString);

// Log an object
console.log(`\n-- Test 2: Log an object --`)
logger.Log(testObject);

// Log without a timestamp
logger.OutputFormatting(false);
console.log(`\n-- Test 3: Log without a timestamp --`)
logger.Log(testString);

// Log without a timestamp, and with object spacing of 2
logger.OutputFormatting(false, 2);
console.log(`\n-- Test 4: Log without a timestamp, and with object spacing of 2 --`)
logger.Log(testObject);

// Log without a timestamp, and with no spacing in the object
logger.OutputFormatting(false, 0);
console.log(`\n-- Test 5: Log without a timestamp, and with no spacing in the object --`)
logger.Log(testObject);
