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
logger.Log(testString);

// Log an object
logger.Log(testObject);
