import { LogEntity, LogSeverityLevel } from "../entities/log.entities";





export abstract class LogRepository {
    abstract saveLog(log: LogEntity): Promise<void>;
    abstract getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]>;
    abstract getLogsDate(date: Date): Promise<LogEntity[]>;
    abstract getLogsSeverityDate(severityLevel: LogSeverityLevel, date: Date): Promise<LogEntity[]>


};