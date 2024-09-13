import 'dotenv/config';
import { FileSystemDatasource } from '../Infrastructure/datasources/file-system.datasource';
import { MongoLogDatasources } from '../Infrastructure/datasources/mongo-log.datasources';
import { PostgresLogRepository } from '../Infrastructure/datasources/postgres-log.datasource';
import { LogRepositoryImpl } from '../Infrastructure/repositories/log.respository.impl';
import { CronService } from './cron/cron-service';
import { EmailService } from './email/email.server';
import { CheckServiceMultiple } from '../domain/use-cases/checks/check-service-multiple';

const fsLogRepository = new LogRepositoryImpl( 
  new FileSystemDatasource(),
);

const mgLogRepository = new LogRepositoryImpl(
  new MongoLogDatasources(),
);
const pgLogRepository = new LogRepositoryImpl(
  new PostgresLogRepository(),
);



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
  




      CronService.createJob(
      '*/5 * * * * *',
      () => {
        const url = 'https://google.com';
        new CheckServiceMultiple(
          [ fsLogRepository, mgLogRepository, pgLogRepository ], 
          () => console.log( `${ url } is ok` ),
          ( error ) => console.log( error ),
        ).execute( url );
      } 
    );

  }


}


