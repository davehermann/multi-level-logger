# multi-level-logger

A simple logging module with flexibility for multiple simultaneous log levels through named logs, and optional timestamp, code location, and color inclusion.

## Getting Started

### Install

```npm install multi-level-logger --only=prod```

*Installing with `--only=prod` is **highly** recommended as **multi-level-logger** does not have any run-time dependencies*

### Quick Start

```javascript
import { Warn } from "multi-level-logger";

Warn("Hello multi-level-logger");

// Console output
// > 1/1/2018, 12:00:00 PM - Hello multi-level-logger
```

## What's new in v1.0.0

+ Rewritten in Typescript
    + Typescript declarations are included
+ Code location for log calls pulled from the stack trace!
+ Console Colors!

See [Migrating from v0.x](./MigratingFrom0x.md) for **breaking changes**
