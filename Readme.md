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
