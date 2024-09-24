import mongoose from "mongoose";
import { envs } from "./../../../src/config/plugins/envs.plugin";
import { MongoDatabase } from "./../../../src/data/mongo/init";
import { LogModel } from "./../../../src/data/mongo/models/log-model";
import { MongoLogDatasources } from "../../../src/Infrastructure/datasources/mongo-log.datasources";
import { LogEntity, LogSeverityLevel } from "./../../../src/domain/entities/log.entities";







describe('mongo-log.datasource.ts MongoLogDatasource use-case', () => {


    beforeAll(async () => {
        await MongoDatabase.connect({
            mongoUrl: envs.MONGO_URL,
            dbName: envs.MONGO_DB_NAME,
        });
    });

    const logDataSource = new MongoLogDatasources();
    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message',
        origin: 'log.datasource.test.ts',
    });

    afterEach(async () => {
        await LogModel.deleteMany();
    }),

        afterAll(async () => {
            await mongoose.connection.close();
        })

    test('should save log', async () => {

        const logSpy = jest.spyOn(console, 'log');

        await logDataSource.saveLog(newLog);

        expect(logSpy).toHaveBeenCalled();
        expect(logSpy).toHaveBeenCalledWith("mongo Log Create:", expect.any(String));

    });

    test("should get logs  ", async () => {

    
        await logDataSource.saveLog(newLog);

        const logs = await logDataSource.getLogs(LogSeverityLevel.low);


        expect(logs.length).toBe(1);
        expect(logs[0].level).toBe(LogSeverityLevel.low);

    });

    test('should get log data', async () => {

        await logDataSource.saveLog(newLog);


        function testert() {   logDataSource.getLogsDate(new Date()); }
        
        expect(testert).toThrow("Method not implemented.");

    });


    test('should get log severity data', async () => {
        await logDataSource.saveLog(newLog)

        function testert() {   logDataSource.getLogsSeverityDate(LogSeverityLevel.low, new Date()); }

        expect(testert )
            .toThrow("Method not implemented.");
    });

})