# Configuration

## Default Configuration

::: warning Out-of-the-box Configuration
**multi-level-logger** is ready out-of-the-box with a default log configured for display at the **Warn** level.
:::

*Default configuration is equal to:*
```javascript
InitializeLogging("warn");
```

## Retrieving Configuration

$$$Reference.LogLevels$$$

**multi-level-logger** exposes the **LogLevels** enumeration for all named log levels.
Levels can be referred to via the string name, the enumeration value, or an integer value between the lowest and highest level.

$$$Reference.GetConfiguredLogging$$$

+ Return the currently configured logging options

## Setting Configuration

$$$Reference.InitializeLogging/hideparams:_subLog$$$

+ The [LogLevels](#loglevels) enumeration has *number* values, and members can be passed directly to *logDefinition*

#### Example

##### Set directly
The following sets the default log level to **Info**, and a log named *webserver* to **Debug**

```javascript
import { InitializeLogging } from "multi-level-logger";

InitializeLogging("info");
InitializeLogging("debug", "webserver");
```

##### Set via configuration object
This code does exactly the same thing using an object to define multiple logs, and using the *LogLevels* enumeration

```javascript
import { LogLevels, InitializeLogging } from "multi-level-logger";

const logDefinition = {
    logLevel: LogLevels.info,
    webserver: { logLevel: LogLevels.debug }
};

InitializeLogging(logDefinition);
```

### OutputFormatting(options)

+ Sets the global options for formatting log output
+ Can be overridden per-log-call

| Parameter | Required | Type | Notes |
| --------- | -------- | ---- | ----- |
| options | yes | [ILogOptionConfiguration](#ilogoptionconfiguration) | Set the formatting for output |

## Interfaces for Configuration

$$$Interface.IBaseConfiguration$$$

$$$Interface.ILevelConfiguration$$$

$$$Interface.ILogDefinition$$$

+ Any property in an *ILogDefinition* that has an *Object* as it's value which contains a **logLevel** property will be configured as a named log at that log level
    + See the [Example: Set via configuration object](#set-via-configuration-object) below

$$$Interface.ILogOptionConfiguration$$$
