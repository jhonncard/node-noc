import { LogModel } from "../../data/mongo/models/log-model";
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entities";



export class MongoLogDatasources implements LogDatasource {
    async saveLog(log: LogEntity): Promise<void> {
       const newLog = await LogModel.create(log);
       //await newLog.save();
      console.log("mongo Log Create:", newLog.id);
    }
    async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
         const logs= await LogModel.find({
            level: severityLevel
         });
         return logs.map(mongoLogs => LogEntity.fromObject(mongoLogs)); 
    }
    getLogsDate(date: Date): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    getLogsSeverityDate(severityLevel: LogSeverityLevel, date: Date): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
}