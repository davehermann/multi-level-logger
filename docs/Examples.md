# Usage Examples

## Log a string to the console with a timestamp, code location from the stack trace, and colors

```javascript
import { Warn } from "multi-level-logger";

function helloLogs() {
    Log(`Hello multi-level-logger`);
}

helloLogs();
```

<pre><code><span>&gt; </span><span style="color: rgb(59, 142, 234);">1/1/2018, 12:00:00 PM</span><span> - </span><span style="color: rgb(245, 245, 67);">helloLogs() </span><span style="color: rgb(13, 188, 121);">[line 4: ./log-example.js]</span><span> - </span><span style="color(229, 229, 229);">Hello multi-level-logger</span></code></pre>

## Log an object to the console at the Info level without a timestamp or code location

```javascript
import { LogLevels, InitializeLogging, OutputFormatting, Info } from "multi-level-logger";

InitializeLogging(LogLevels.info);
OutputFormatting({ includeTimestamp: false, includeCodeLocation: false });

Info({ prop1: true, prop2: "yes" });
```

<pre><code><span>&gt; </span>
<span style="color(229, 229, 229);">{
    "prop1": true,
    "prop2": "yes"
}</span></code></pre>

## Configure defaults to not show timestamp or code location, then log an object at the DEBUG level with the timestamp

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
