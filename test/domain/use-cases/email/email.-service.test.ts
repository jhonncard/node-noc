import { LogEntity } from "../../../../src/domain/entities/log.entities";
import { LogRepository } from "../../../../src/domain/repository/log.respository";
import { SendEmailLogs } from "../../../../src/domain/use-cases/email/send-email-log";

describe('email.service.ts EmailService use-case', () => {

    const mockEmailServices = {
        sendEmailWithFileSystemLogs: jest.fn().mockReturnValue(true)
    };

    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockRespository: LogRepository = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
        getLogsDate: jest.fn(),
        getLogsSeverityDate: jest.fn()
    };

    const sendEmailLogs = new SendEmailLogs(mockEmailServices as any, mockRespository);

     test('should call sendEmail and savelog', async () => {
     
         const result = await sendEmailLogs.execute('test@google.com');

         expect(result).toBeTruthy();
         expect(mockEmailServices.sendEmailWithFileSystemLogs).toHaveBeenCalled();
         expect(mockRespository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
         expect(mockRespository.saveLog).toHaveBeenCalledTimes(1);
         expect(mockRespository.saveLog).toHaveBeenCalledWith({
             level: 'high',
             message: 'Email log sended to test@google.com',
             origin: 'send-email-log.ts',
             createdAt: expect.any(Date)
         });

        })
     test('should log in case of error', async () => {
     
         mockEmailServices.sendEmailWithFileSystemLogs.mockReturnValue(false);
         const result = await sendEmailLogs.execute('test@google.com');

         expect(result).toBeFalsy();
         expect(mockEmailServices.sendEmailWithFileSystemLogs).toHaveBeenCalled();
         expect(mockRespository.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
         expect(mockRespository.saveLog).toHaveBeenCalledTimes(1);
         expect(mockRespository.saveLog).toHaveBeenCalledWith({
             level: 'high',
             message: 'Error: Email log not sended',
             origin: 'send-email-log.ts',
             createdAt: expect.any(Date)
         });     
        })

})