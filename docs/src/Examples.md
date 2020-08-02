# Usage Examples

## Default logging

:::tip What's Shown
Log a string to the console with a timestamp, code location from the stack trace, and colors
:::

```javascript
import { Warn } from "multi-level-logger";

function helloLogs() {
    Log(`Hello multi-level-logger`);
}

helloLogs();
```

<pre><code><span>&gt; </span><span style="color: rgb(59, 142, 234);">1/1/2018, 12:00:00 PM</span><span> - </span><span style="color: rgb(245, 245, 67);">helloLogs() </span><span style="color: rgb(13, 188, 121);">[line 4: ./log-example.js]</span><span> - </span><span style="color(229, 229, 229);">Hello multi-level-logger</span></code></pre>

## Turn off timestamp and code location

:::tip What's Shown
Log an object to the console at the Info level without a timestamp or code location
:::


```javascript
import { LogLevels, InitializeLogging, OutputFormatting, Info } from "multi-level-logger";

InitializeLogging(LogLevels.info);
OutputFormatting({ includeTimestamp: false, includeCodeLocation: false });

Info({ prop1: true, prop2: "yes" });
```

<pre><code><span style="color(229, 229, 229);">{
    "prop1": true,
    "prop2": "yes"
}</span></code></pre>

## Override configuration on a single log call

:::tip What's Shown
Configure defaults to not show timestamp or code location, then log an object at the DEBUG level with the timestamp
:::


```javascript
import { InitializeLogging, OutputFormatting, Debug, Info } from "multi-level-logger";

InitializeLogging(15);
OutputFormatting({ includeTimestamp: false, includeCodeLocation: false });

Info("Using defaults");

Debug({ prop1: true, prop2: "yes" }, { configuration: { includeTimestamp: true } });
```

<pre><code><span>&gt; </span><span style="color(229, 229, 229);">Using defaults</span>
<span>&gt; </span><span style="color: rgb(59, 142, 234);">1/1/2018, 12:00:00 PM</span><span> - </span><span style="color(229, 229, 229);">{
                              "prop1": true,
                              "prop2": "yes"
                          }</span></code></pre>

## Catch and log any application errors as fatal errors

:::tip What's Shown
Error message and stack trace using colorized logging
:::

```javascript
const { Fatal } = require(`multi-level-logger`);

async function runProgram() {
    throw new Error(`here`);
}

runProgram()
    .catch(err => {
        Fatal(err);
    });
```

<pre><code><span style="color: rgb(205, 49, 49);">1/1/2018, 12:00:00 PM - runProgram.catch.err() [line 9: ./log-example.js]</span><span> - </span><span style="background-color: rgb(205, 49, 49); color: white;">Error: here
    at runProgram (./log-example.js:4:11)
    at Object.&lt;anonymous&gt; (./log-example.js:7:1)
    at Module._compile (internal/modules/cjs/loader.js:778:30)
    at Object.Module._extensions..js (internal/modules/cjs/loader.js:789:10)
    at Module.load (internal/modules/cjs/loader.js:653:32)
    at tryModuleLoad (internal/modules/cjs/loader.js:593:12)
    at Function.Module._load (internal/modules/cjs/loader.js:585:3)
    at Function.Module.runMain (internal/modules/cjs/loader.js:831:12)
    at startup (internal/bootstrap/node.js:283:19)
    at bootstrapNodeJSCore (internal/bootstrap/node.js:623:3)</span></code></pre>

## Turn off log colors

:::tip What's Shown
Logging an object at the Warn level with colors turned off
:::

```javascript
const { OutputFormatting, Warn } = require(`multi-level-logger`);

OutputFormatting({ useColors: false });

Warn({ prop1: true, prop2: "yes" });
```

```
1/1/2018, 12:00:00 PM - [line 5: ./log-example.js]
     {
         "prop1": true,
         "prop2": "yes"
     }

```
