import { PrismaClient, SeverityLevel } from "@prisma/client";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entities";
import { LogRepository } from "../../domain/repository/log.respository";



const prisma = new PrismaClient();
const severityEnum ={
    low : SeverityLevel.LOW,
    medium: SeverityLevel.MEDIUM,
    high: SeverityLevel.HIGH,
}


export class PostgresLogRepository implements LogRepository {



   async saveLog(log: LogEntity): Promise<void> {
        const level = severityEnum[log.level];
        const newLog = await prisma.logModel.create({
            data: {
            ...log,
            level:level,
            }
        });
    }
    async  getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
        const level = severityEnum[severityLevel]
            const logs = await prisma.logModel.findMany({
                    where: { level: level}
                }); 
        return logs.map(postgreslogs => LogEntity.fromObject(postgreslogs)); // logs
    }

    getLogsDate(date: Date): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    getLogsSeverityDate(severityLevel: LogSeverityLevel, date: Date): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    
}
      