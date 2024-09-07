import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entities";
import { LogRepository } from "../../domain/repository/log.respository";


export class LogRepositoryImpl implements LogRepository {

 
    constructor(
        private readonly logDatasource: LogDatasource,
    ) {}

    async saveLog(log: LogEntity): Promise<void> {
       return   this.logDatasource.saveLog(log);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
       return this.logDatasource.getLogs(severityLevel);
    }
    
    getLogsDate(date: Date): Promise<LogEntity[]> {
       return this.logDatasource.getLogsDate(date);
    }
    getLogsSeverityDate(severityLevel: LogSeverityLevel, date: Date): Promise<LogEntity[]> {
       return this.logDatasource.getLogsSeverityDate(severityLevel, date);
    }
}