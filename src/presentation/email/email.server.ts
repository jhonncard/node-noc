import nodemailer from 'nodemailer';
import { envs } from '../../config/plugins/envs.plugin';
import { LogEntity, LogSeverityLevel } from '../../domain/entities/log.entities';


interface SendMailOptions {
    to: string | string[];
    subject: string;
    htmlbody: string;
     attachments? : Attachment[];
}
interface Attachment {
    filename : string;
    path : string;
}



export class EmailService {
    

    private  transporter = nodemailer.createTransport({
        service: envs.MAILER_SERVICE,
        auth: {
            user: envs.MAILER_EMAIL,
            pass: envs.MAILER_SECRET_KEY
        }
    });

    constructor() {}

    async sendEmail(options: SendMailOptions): Promise<boolean> {
         const { to, subject, htmlbody, attachments=[] }= options;

         try {
            const sendInformation = await this.transporter.sendMail({
                to: to,
                subject: subject,
                html: htmlbody
            })
        
            return true ;
         } catch (error) {
            return false;  
         }
    }

    async sendEmailWithFileSystemLogs(to: string|string[]){
      const subject = 'File System Logs';
      const htmlbody = `
      <h3>File System Logs - NOC</h3>
      <P style="color:white; font-size: 20px; background-color: green"> esto es una pruba de envio de correos  con adjuntos</P>
      `;
      const attachments: Attachment[] = [
        { filename: 'logs-all.log', path: './logs/logs-all.log' },
        { filename: 'logs-high.log', path: './logs/logs-high.log' },
        { filename: 'logs-medium.log', path: './logs/logs-medium.log' }
      ];
      return  this.sendEmail({ to, subject, htmlbody, attachments });

    }

}