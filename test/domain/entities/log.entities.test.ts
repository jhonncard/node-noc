import exp from "constants";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entities";





describe('log.entities.ts LogEntity', () => {


    test('should cretate a LogEntity instance', async () => {
        const newLogObj ={
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'log.entities.test.ts',
        };
         const log = new LogEntity(newLogObj);

         expect(log).toBeInstanceOf(LogEntity);
         expect(log.message).toEqual(newLogObj.message);
         expect(log.level).toEqual(newLogObj.level);
         expect(log.origin).toEqual(newLogObj.origin);
         expect(log.createdAt).toEqual(expect.any(Date));
         
    });
    test('should cretate a LogEntity instance fronjson', async () => {

        const json = `{"message":"TypeError: fetch failed","level":"high","createdAt":"2024-09-06T09:50:33.651Z"}`
        const log  = LogEntity.fromJson(json);

        expect(log).toBeInstanceOf(LogEntity);  
        expect(log.message).toEqual('TypeError: fetch failed');
        expect(log.level).toEqual('high');
        expect(log.createdAt).toBeInstanceOf(Date);

    });
    test('should cretate a LogEntity instancefrom object', async () => {
        const obj = {"message":"TypeError: fetch failed","level":"high","createdAt":"2024-09-06T09:50:33.651Z"}
        const log = LogEntity.fromObject(obj);

        expect(log).toBeInstanceOf(LogEntity);
        expect(log.message).toEqual('TypeError: fetch failed');
        expect(log.level).toEqual('high');
        expect(log.createdAt).toBeInstanceOf(Date);
    });
    



})