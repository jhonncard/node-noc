
export enum LogSeverityLevel {
    low='low',
    medium='medium',
    high='high'
}



export class LogEntity {

     public level: LogSeverityLevel;
     public message: string;
     public createdAt: Date;


     /**
      *
      */
     constructor(mesaage: string, level: LogSeverityLevel) {
         this.message = mesaage;
         this.level = level;
         this.createdAt = new Date();
        
     }

 static fromJson = ( json: string ):LogEntity =>  {
   const{ level, message, createdAt } =  JSON.parse(json);

   const log = new LogEntity(message, level);
   log.createdAt = new Date(createdAt);
   return log;
 }

}