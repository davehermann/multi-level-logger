import { ILog } from "./interfaces";
declare function logWriter(data: string | Record<string, unknown>, { configuration, messageLevel, options }: ILog): void;
export { logWriter as LogWriter, };
