import * as fs from 'fs';
import { LogDatasource } from "../../domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../domain/entities/log.entities";
import { error } from 'console';


export class FileSystemDatasource implements LogDatasource {

    private readonly logPath = 'logs/';
    private readonly allLogsPath = 'logs/logs-all.log';
    private readonly mediumLogsPath = 'logs/logs-medium.log';
    private readonly highLogsPath = 'logs/logs-high.log';

    /**
     *
     */
    constructor() {
        this.createLogFiles();
    }
    
    private createLogFiles = () => {
        if ( !fs.existsSync( this.logPath ) ) {
            fs.mkdirSync( this.logPath );
        }; 
        [ this.allLogsPath, this.mediumLogsPath, this.highLogsPath ].forEach( path => {
            if ( fs.existsSync( path ) ) return;
            fs.writeFileSync( path, '' );

        });
    }

    private getLogsFromFile = ( path: string ): LogEntity[] => {
        const constent = fs.readFileSync( path, 'utf-8' );
        const logs = constent.split( '\n' ).map(LogEntity.fromJson);
        return logs;
        
    }

   async saveLog(newLog: LogEntity): Promise<void> {

    const logAsJson = `${ JSON.stringify( newLog ) }\n}`;
         fs.appendFileSync(this.allLogsPath,logAsJson);  ;

         if (newLog.level === LogSeverityLevel.low) return;

         if (newLog.level === LogSeverityLevel.medium) {
             fs.appendFileSync(this.mediumLogsPath,logAsJson);
         }else{
             fs.appendFileSync(this.highLogsPath,logAsJson);
         }
    }


   async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
       switch (severityLevel) {
           case LogSeverityLevel.low:
               return this.getLogsFromFile(this.allLogsPath);
           case LogSeverityLevel.medium:
               return this.getLogsFromFile(this.mediumLogsPath);
           case LogSeverityLevel.high:
               return this.getLogsFromFile (this.highLogsPath);
           default:
               throw new Error(`invalid severity level: ${ severityLevel }`);
       }

    }

    getLogsDate(date: Date): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
    getLogsSeverityDate(severityLevel: LogSeverityLevel, date: Date): Promise<LogEntity[]> {
        throw new Error("Method not implemented.");
    }
};