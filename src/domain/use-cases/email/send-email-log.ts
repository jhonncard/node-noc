import { EmailService } from "../../../presentation/email/email.server";
import { LogEntity, LogSeverityLevel } from "../../entities/log.entities";
import { LogRepository } from "../../repository/log.respository";

interface SendLogEmailUseCase {
    execute : ( to: string | string[] ) => Promise<boolean>
}



export class sendEmailLogs implements SendLogEmailUseCase {

  constructor(
     private readonly emailService: EmailService,
     private readonly logRepository: LogRepository
  ) {}

  async  execute (to: string | string[])   {
  try {
    const sent = await this.emailService.sendEmailWithFileSystemLogs(to);
    if (!sent){
        throw new Error('Email log not sended');
    }
      const log = new LogEntity({ 
        level: LogSeverityLevel.high, 
        message: `Email log sended to ${to}`, 
        origin: 'send-email-log.ts' });
      this.logRepository.saveLog(log);

      return true;
  } catch (error) {
    const log = new LogEntity({ level: LogSeverityLevel.high, message:  `${error}`, origin: 'send-email-log.ts' }); 
    this.logRepository.saveLog (log);
    return false;
  }

  
  }
    
}