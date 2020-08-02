# Writing Logs



## Logging Functions

+ Logging functions write to `console.log()`, except for calls to `Err` and `Fatal` which write to `console.error()`
+ *data* accepts a string, or any object that converts with JSON.stringify()
+ *options* overrides the [OutputFormatting()](./generated/Configuration.html#outputformatting-options) settings for individual calls to a logging function

### Log(data, options)


::: tip Log()
Always write to the log no matter the configured log level
:::

### Dev(data, options)

### Trace(data, options)

### Debug(data, options)

### Info(data, options)

### Warn(data, options)

### Err(data, options)

### Fatal(data, options)

| Parameter | Required | Type | Notes |
| --------- | -------- | ---- | ----- |
| data | yes | string &#124; Record&lt;string, unknown&gt; | Data to write to the log |
| options | yes | [ILogOptions](#ilogoptions) | Additional options for controlling log output |


::: tip
The configured log level will write any messages at or above that level.
:::

## Interfaces for Log Writing

### ILogOptions
| Parameter | Required | Type | Notes |
| --------- | :------: | :--: | ----- |
| asIs | no | boolean | Override the conversion of a Javascript *Object* via *JSON*<br />  - *When passing in an **object** for the **data** property* |
| configuration | no | [ILogOptionConfiguration](#ilogoptionconfiguration) | Override formatting configuration |
| logName | no | string | When multiple named logs are configured, write to this named log |


### ILogOptionConfiguration
**Log writting configuration for the single message**
| Parameter | Required | Type | Notes |
| --------- | :------: | :--: | ----- |
| includeCodeLocation | no | boolean | Show the code location when printing to the log |
| includeTimestamp | no | boolean | Show a timestamp when printing to the log |
| jsonFormatter | no | number | Amount of whitespace to include for the JSON.stringify() function |
| useColors | no | boolean | Display colors in a terminal capable of showing them |

