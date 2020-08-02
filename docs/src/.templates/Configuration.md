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

### Environment Variable

**multi-level-logger** supports setting the log level via a **LOG_LEVEL** environment variable

#### Example

```javascript
const { Info } = require(`multi-level-logger`);

Info("Info-level log");
```

<pre><code><span>&gt; LOG_LEVEL=debug node testLog.js</span>
<span>&gt; </span><span style="color: rgb(59, 142, 234);">1/1/2018, 12:00:00 PM</span><span> - </span><span style="color: rgb(13, 188, 121);">[line 3: ./log-example.js]</span><span> - </span><span style="color(229, 229, 229);">Info-level log</span></code></pre>


:::tip Note
**multi-level-logger** defaults to *warn*, and the log above would not be shown without the use of the enviornment variable
:::

### Methods

$$$Reference.InitializeLogging/hideparams:_subLog,headerlevel:4$$$

+ The [LogLevels](#loglevels) enumeration has *number* values, and members can be passed directly to *logDefinition*

##### Example

###### Set directly
The following sets the default log level to **Info**, and a log named *webserver* to **Debug**

```javascript
import { InitializeLogging } from "multi-level-logger";

InitializeLogging("info");
InitializeLogging("debug", "webserver");
```

###### Set via configuration object
This code does exactly the same thing using an object to define multiple logs, and using the *LogLevels* enumeration

```javascript
import { LogLevels, InitializeLogging } from "multi-level-logger";

const logDefinition = {
    logLevel: LogLevels.info,
    webserver: { logLevel: LogLevels.debug }
};

InitializeLogging(logDefinition);
```

#### OutputFormatting(options)

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
