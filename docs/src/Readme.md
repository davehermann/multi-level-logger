# multi-level-logger

A simple logging module with flexibility for multiple simultaneous log levels through named logs, and optional timestamp, code location, and color inclusion.

## Getting Started

### Install

```npm install multi-level-logger --only=prod```

::: tip Installation
*Installing with `--only=prod` is **highly** recommended as **multi-level-logger** does not have any run-time dependencies*
:::

### Quick Start

```javascript
import { Warn } from "multi-level-logger";

Warn("Hello multi-level-logger");
```

<pre><code><span>&gt; </span><span style="color: rgb(59, 142, 234);">1/1/2018, 12:00:00 PM</span><span> - </span><span style="color: rgb(13, 188, 121);">[line 3: ./log-example.js]</span><span> - </span><span style="color(229, 229, 229);">Hello multi-level-logger</span></code></pre>

## What's new in v2.0.0

+ Rewritten in Typescript
    + **Typescript declarations are included**
+ **Code location** for log calls pulled from the stack trace!
+ Console **Colors**!
+ Support for **LOG_LEVEL** environment variable to set log level

See [Migrating from v1.x to v2.x](./MigratingFrom1x.md) for **breaking changes** to the API

## License

*multi-level-logger* is released under the MIT License.
See [License](https://github.com/davehermann/multi-level-logger/blob/master/LICENSE.md) file for more details.

## Contributing
Pull requests may be considered provided they follow existing code's styling, are well commented, and pass all existing tests as well as provide new tests as-needed.
