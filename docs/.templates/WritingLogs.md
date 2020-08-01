# Writing Logs



## Logging Functions

+ Logging functions write to `console.log()`, except for calls to `Err` and `Fatal` which write to `console.error()`
+ *data* accepts a string, or any object that converts with JSON.stringify()
+ *options* overrides the [OutputFormatting()](./generated/Configuration.html#outputformatting-options) settings for individual calls to a logging function

$$$Reference.Log/noparameters$$$

::: tip Log()
Always write to the log no matter the configured log level
:::

$$$Reference.Dev/noparameters$$$
$$$Reference.Trace/noparameters$$$
$$$Reference.Debug/noparameters$$$
$$$Reference.Info/noparameters$$$
$$$Reference.Warn/noparameters$$$
$$$Reference.Err/noparameters$$$
$$$Reference.Fatal$$$

::: tip
The configured log level will write any messages at or above that level.
:::

## Interfaces for Log Writing

$$$Interface.ILogOptions$$$

$$$Interface.ILogOptionConfiguration$$$
