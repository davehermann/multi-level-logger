/** Available log levels */
declare enum levels {
    dev = 0,
    trace = 10,
    debug = 20,
    info = 30,
    warn = 40,
    error = 50,
    fatal = 60
}
/** ANSI colors defined for use in logs */
declare enum colors {
    brightBlue = "\u001B[94m",
    brightRed = "\u001B[91m",
    brightYellow = "\u001B[93m",
    bold = "\u001B[1m",
    green = "\u001B[32m",
    red = "\u001B[31m",
    reset = "\u001B[0m",
    yellow = "\u001B[33m",
    background_red = "\u001B[41m"
}
export { levels, colors };
