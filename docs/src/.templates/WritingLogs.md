# Writing Logs



## Logging Functions

+ Logging functions write to `console.log()`, except for calls to `Err` and `Fatal` which write to `console.error()`
+ *data* accepts a string, or any object that converts with JSON.stringify()
+ *options* overrides the [OutputFormatting()](./generated/Configuration.html#outputformatting-options) settings for individual calls to a logging function

$$$Function.Log/noparameters$$$

::: tip Log()
Always write to the log no matter the configured log level
:::

$$$Function.Dev/noparameters$$$
$$$Function.Trace/noparameters$$$
$$$Function.Debug/noparameters$$$
$$$Function.Info/noparameters$$$
$$$Function.Warn/noparameters$$$
$$$Function.Err/noparameters$$$
$$$Function.Fatal$$$

::: tip
The configured log level will write any messages at or above that level.
:::

## Interfaces for Log Writing

$$$Interface.ILogOptions$$$

$$$Interface.ILogOptionConfiguration$$$
