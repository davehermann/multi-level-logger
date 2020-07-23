interface StandardLevels {
    /** 0 */
    dev: number;
    /** 10 */
    trace: number;
    /** 20 */
    debug: number;
    /** 30 */
    info: number;
    /** 40 */
    warn: number;
    /** 50 */
    error: number;
    /** 60 */
    fatal: number;
}

interface LogDefinition {
    logLevel?: string;
    [x:string]: any;
}

interface Settings {
    logLevel: any;
    includeTimestamp: boolean;
    jsonSpacing: number;
}

interface LevelConfiguration {
    default: number;
    [x:string]: number;
}

interface IBaseConfiguration {
    logLevel: LevelConfiguration;
    includeTimestamp: boolean;
    includeCodeLocation: boolean;
    jsonFormatter: number;
}

interface ILogOptionConfiguration {
    includeTimestamp?: boolean;
    includeCodeLocation?: boolean;
    jsonFormatter?: number;
}

interface ILog {
    configuration: IBaseConfiguration;
    messageLevel: number;
    options?: ILogOptions;
}

interface ILogOptions {
    /** Override formatting configuration */
    configuration?: ILogOptionConfiguration;
    /**
     * Override the conversion of a Javascript *Object* via *JSON*
     *   - *When passing in an **object** as **data**
     */
    asIs?: boolean;
    /** When multiple named logs are configured, write to this named log */
    logName?: string;
}

interface IStackTraceObject {
    stack?: Array<NodeJS.CallSite>;
}

export {
    LogDefinition,
    Settings,
    StandardLevels,
    IBaseConfiguration,
    ILog,
    ILogOptions,
    IStackTraceObject,
};
