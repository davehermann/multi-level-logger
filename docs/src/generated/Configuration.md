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

### LogLevels

| Member | Value |
| ------ | ----- |
| dev | 0 |
| trace | 10 |
| debug | 20 |
| info | 30 |
| warn | 40 |
| error | 50 |
| fatal | 60 |


**multi-level-logger** exposes the **LogLevels** enumeration for all named log levels.
Levels can be referred to via the string name, the enumeration value, or an integer value between the lowest and highest level.

### GetConfiguredLogging()
**Returns:** *[IBaseConfiguration](#ibaseconfiguration)*



+ Return the currently configured logging options

## Setting Configuration

### InitializeLogging(logDefinition, logName)

| Parameter | Required | Type | Notes |
| --------- | -------- | ---- | ----- |
| logDefinition | yes | string &#124; number &#124; [ILogDefinition](#ilogdefinition) | The log level initializer matching one of four types<br />     1. *String* - a string matching a log level in the levels object<br />     1. *Number* - an integer value to use as the log level<br />     1. *Object* - an object with a `logLevel` property, matching 1 or 2 above<br />     1. *Object* - an object with each key matching a named log, and the value as 1, 2, or 3 above |
| logName | no | string | Name of the log, defaulting to "default" |


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

### IBaseConfiguration
**Configuration for the module**
| Parameter | Required | Type | Notes |
| --------- | :------: | :--: | ----- |
| includeCodeLocation | yes | boolean | Show the code location when printing to the log |
| includeTimestamp | yes | boolean | Show a timestamp when printing to the log |
| jsonFormatter | yes | number | Amount of whitespace to include for the JSON.stringify() function |
| logLevel | yes | [ILevelConfiguration](#ilevelconfiguration) | Minimum log level to display |
| useColors | yes | boolean | Display colors in a terminal capable of showing them |


### ILevelConfiguration
**Log level display**
| Parameter | Required | Type | Notes |
| --------- | :------: | :--: | ----- |
| default | yes | number | Default log level for all logging |


### ILogDefinition
**Interface for object used as log initializer**
| Parameter | Required | Type | Notes |
| --------- | :------: | :--: | ----- |
| logLevel | no | string &#124; number | Named log level, threshold numerical log value, or log level enumeration |


+ Any property in an *ILogDefinition* that has an *Object* as it's value which contains a **logLevel** property will be configured as a named log at that log level
    + See the [Example: Set via configuration object](#set-via-configuration-object) below

### ILogOptionConfiguration
**Log writting configuration for the single message**
| Parameter | Required | Type | Notes |
| --------- | :------: | :--: | ----- |
| includeCodeLocation | no | boolean | Show the code location when printing to the log |
| includeTimestamp | no | boolean | Show a timestamp when printing to the log |
| jsonFormatter | no | number | Amount of whitespace to include for the JSON.stringify() function |
| useColors | no | boolean | Display colors in a terminal capable of showing them |
