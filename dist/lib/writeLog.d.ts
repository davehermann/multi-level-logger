import { ILog } from "./interfaces";
declare function logWriter(data: any, { configuration, messageLevel, options }: ILog): void;
export { logWriter as LogWriter, };
