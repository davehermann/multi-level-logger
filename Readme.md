# multi-level-logger

A simple logging module with flexibility for multiple simultaneous log levels through named logs, and optional timestamp, code location, and color inclusion.

[**Detailed Documentation is available here**](https://davehermann.github.io/multi-level-logger/)

## Getting Started

### Install

```npm install multi-level-logger --only=prod```

+ *Installing with `--only=prod` is **highly** recommended as **multi-level-logger** does not have any run-time dependencies*

### Quick Start

```javascript
import { Warn } from "multi-level-logger";

Warn("Hello multi-level-logger");
```

<pre><code><span>&gt; </span><span style="color: rgb(59, 142, 234);">1/1/2018, 12:00:00 PM</span><span> - </span><span style="color: rgb(13, 188, 121);">[line 3: ./log-example.js]</span><span> - </span><span style="color(229, 229, 229);">Hello multi-level-logger</span></code></pre>

## Recent Releases

*See [What's new](https://davehermann.github.io/multi-level-logger/#what-s-new) in the documentation for additional details

### v2.1.0 - Lazy Evaluation

+ Adds support for passing a function method as data
    + Function evaluation occurs only when the log level will be written

### v2.0 - Major Release

+ Typescript declarations
+ *optional* - Code location from the stack trace
+ *optional* - Console colors
+ Breaking Changes
