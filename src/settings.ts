import { Settings as SettingsInterface } from "./interfaces";
import { levels } from "./levels";

/**
 * By default
 * Log level is WARN
 * Timestamp is included
 * JSON formatting uses 4 spaces
 */
class Settings {

}
let logLevel = { default: levels[`warn`] },
    includeTimestamp = true,
    jsonFormatter = 4;

export {
    _
}
