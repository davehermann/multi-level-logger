# Configuration

**multi-level-logger** is ready out-of-the-box with a default log configured for display at the **Warn** level.

## Configured log levels

**multi-level-logger** preconfigures and exposes the following log level enumeration

$$$enumeration.levels$$$

## Methods

$$$function.InitializeLogging$$$

+ The [LogLevels](#loglevels) enumeration has *number* values, and members can be passed directly to *logDefinition*

#### Example

The following sets the default log level to **Info**, and a log named *webserver* to **Debug**

```javascript
import { InitializeLogging } from "multi-level-logger";

InitializeLogging("info");
InitializeLogging("debug", "webserver");
```

This code does exactly the same thing using an object to define multiple logs, and using the *LogLevels* enumeration

```javascript
import { LogLevels, InitializeLogging } from "multi-level-logger";

const logDefinition = {
    logLevel: LogLevels.info,
    webserver: { logLevel: LogLevels.debug }
};

InitializeLogging(logDefinition);
```

