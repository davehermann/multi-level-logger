# Migrating from v1.x to v2.x

The following methods have breaking changes with v1.x.

:::warning
Note that this includes the additional options passed to **all log writing function calls**.
:::

+ **OutputFormatting()**
    + Now expects an object instead of parameters
    + See [OutputFormatting(options)](./generated/Configuration.html#outputformatting-options)
+ Log writing methods signature expects an options object instead of parameters
    + **Info(data [, asIs, logName])** &gt;&gt;&gt; **Info(data [, options])**
    + The *options* object also supports a *configuration* property that can override the current logging configuration **per-call**
    + See [Writing Logs](./generated/WritingLogs.md)
