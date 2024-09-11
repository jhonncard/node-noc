import 'dotenv/config';
import { CheckService } from '../domain/use-cases/checks/check-service';
import { FileSystemDatasource } from '../Infrastructure/datasources/file-system.datasource';
import { LogRepositoryImpl } from '../Infrastructure/repositories/log.respository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.server';

const fileSystemLogRepository = new LogRepositoryImpl( new FileSystemDatasource(), );
const emailService = new EmailService();

export class Server {

  public static start() {

    console.log( 'Server started...' );

    
    //console.log(process.env);
    //todo: enviar email con adjuntos  
   
    // emailService.sendEmail({
    //   to: 'jhonnya.cardonaa@gmail.com',
    //   subject: 'File System Logs',
    //   htmlbody: `
    //   <h3>File System Logs - NOC</h3> 
    //   <P> Deserunt commodo magna commodo adipisicing exercitation eiusmod aute officia ut anim ex enim excepteur. </P>
    //   <p> ver logs </p>
    //   `,
    // });
    // emailService.sendEmailWithFileSystemLogs( 'jhonnya.cardonaa@gmail.com' );
  




    //     CronService.createJob(
    //   '*/5 * * * * *',
    //   () => {
    //     const url = 'https://google.com';
    //     new CheckService(
    //       fileSystemLogRepository,
    //       () => console.log( `${ url } is ok` ),
    //       ( error ) => console.log( error ),
    //     ).execute( url );
        // new CheckService().execute( 'http://localhost:3000' );
    //   }
    // );

  }


}


