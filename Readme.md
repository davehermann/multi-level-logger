# multi-level-logger

A simple logging module with flexibility for multiple simultaneous log levels through named logs, and optional timestamp inclusion.

## Getting Started

### Install

```npm install multi-level-logger```

### Quick Start

```javascript
const { Warn } = require("multi-level-logger");

Warn("Hello multi-level-logger");

// Console output
// > 1/1/2018, 12:00:00 PM - Hello multi-level-logger
```

## Configuration

### Setting Configuration

By default, *multi-level-logger* is configured for a single unnamed log set to *warn*, and will include a timestamp in the logged data

#### #InitializeLogging(logDefinition, [logName])

Configures the log level for the default log, or any named logs

+ `logDefinition`
    + Defines the <u>minimum</u> level of messages to log
    + Can be *string*, *number*, or *object*
        + **string**
            + Must match one of the **named log levels**
            + Example: log everything at or above *info* level
            ```javascript
            InitializeLogging("info")
            ```
        + **number**
            + Any numerical value
            + Example: log everything at or above *27*
            ```javascript
            InitializeLogging(27)
            ```
                + The named level *info* would be the lowest level to log in this example
        + **object**
            + An object that contains a **logLevel** property with a **string** or **number** value
                + Example:
                ```javascript
                InitializeLogging({ logLevel: "info" })
                ```
            + An object that contains properties corresponding to log names (see `logName` below) that have a **logLevel** property
                + Example:
                ```javascript
                InitializeLogging({
                    log1: { logLevel: "warn" },
                    log2: { logLevel: 18 }
                })
                ```
            + A default level and named logs can be mixed
                + Example:
                ```javascript
                InitializeLogging({
                    logLevel: "info",
                    log1: { logLevel: "warn" },
                    log2: { logLevel: 18 }
                })
                ```
+ `logName`
    + Defines the name of the log corresponding to the level passed into `logDefinition`
    + Has no impact when passing an **object** into `logDefinition`
    + Example:
    ```javascript
    InitializeLogging("trace", "log3")
    ```

**Default configuration:**
```javascript
InitializeLogging("warn")
```

#### #IncludeTimestamp(boolean)

+ Include a timestamp, using `.toLocaleString()`, in any data written to the log
+ When logging objects, the stringified JSON will be aligned with the end of the timestamp

**Default configuration:**
```javascript
IncludeTimestamp(true)
```

### Retrieving Configuration

#### #LogLevels

+ Retrieves the **named log levels** object via a property on the module
```javascript
{
    dev: 0,
    trace: 10,
    debug: 20,
    info: 30,
    warn: 40,
    error: 50,
    fatal: 60,
}
```

#### #GetConfiguredLogging()

+ Retrieves the current logging configuration
```javascript
{ logLevel, includeTimestamp }
```
    + `logLevel`
        + An object containing all log levels defined
            + The default log will be listed via a `default` property
    + `includeTimestamp`
        + `true` or `false`
+ Example returned object:
```javascript
{
    logLevel: {
        default: "info",
        log1: "warn",
        log2: 18
    },
    includeTimestamp: true
}
```

## Write Logs

All logging is performed by calling a log method.
Writing to logs will write:
+ *Timestamp*, if timestamp is included
+ *Value* if the data is not an object, or `asIs == true`
+ *JSON* for objects if `asIs == false`
    + JSON is formatted to align with the end of the timestamp when a timestamp is included

Available methods match named log levels

| Method | Writes To |
| ------ | --------- |
| Dev() | `console.log()` |
| Trace() | `console.log()` |
| Debug() | `console.log()` |
| Info() | `console.log()` |
| Warn() | `console.log()` |
| Err() | `console.error()` |
| Fatal() | `console.error()` |

Each of these methods has the exact same signature, taking between 1 and 3 parameters

| Parameter | Type | Required | Description |
| --------- | ---- | -------- | ----------- |
| `data` | any | yes | The data to write to the log |
| `asIs` | boolean | no | Write object data as-is, without running `JSON.stringify()` |
| `logName` | string | no | Specify the log to write to, or use default if no name is specified |

Example:
```javascript
const { IncludeTimestamp, Warn } = require("multi-level-logger");

// Log a string to the console without a timestamp
IncludeTimestamp(false);
Warn("Hello multi-level-logger");

/*
    > Hello multi-level-logger
*/

// Log an object to the console with a timestamp
IncludeTimestamp(true);
Warn({ prop1: true, prop2: "yes" });

/*
    > 1/1/2018, 12:00:00 PM - {
                                  "prop1": true,
                                  "prop2": "yes"
                              }
*/
```

# License

*multi-level-logger* is released under the MIT License.
See [License](./License.md) file for more details.

# Contributing
While this is well suited for projects that may need multiple logs at different log levels, this is primarily a formalized version of a personal module used in multiple projects.

Pull requests may be considered provided they follow existing code's styling, are well commented, and pass all existing tests as well as provide new tests as-needed.
