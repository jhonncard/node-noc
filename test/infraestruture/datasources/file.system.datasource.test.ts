import path from "path";
import { FileSystemDatasource } from "../../../src/Infrastructure/datasources/file-system.datasource";
import fs from 'fs';
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entities";


describe('file system datasource', () => {
    const logPath = path.join(__dirname, '../../../logs');

    beforeEach(() => {
        fs.rmSync('./logs/logs-all.log');
    })
    test('file system datasource', () => {
        new FileSystemDatasource();
        const files = fs.readFileSync(logPath);
        expect(files).toEqual(['logs-all.log', 'logs-medium.log', 'logs-hig.log']);
    });


    test('should save a log in logs-all.log and high', async () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.low,
            message: 'test-message',
            origin: 'log.datasource.test.ts',
        })

        await logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-all.log`, 'utf-8');
        expect(allLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-all.log', async () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.medium,
            message: 'test-message',
            origin: 'log.datasource.test.ts',
        })

        await logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');
        const mediumLogs = fs.readFileSync(`${logPath}/logs-medium.log`, 'utf-8');

        expect(allLogs).toContain(JSON.stringify(log));
        expect(mediumLogs).toContain(JSON.stringify(log));

    });
    test('should save a log in logs-all.log nd medium', async () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test-message',
            origin: 'log.datasource.test.ts',
        })

        await logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');


        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));

    });

    test('should save a log in logs-all.log nd medium', async () => {

        const logDatasource = new FileSystemDatasource();
        const log = new LogEntity({
            level: LogSeverityLevel.high,
            message: 'test-message',
            origin: 'log.datasource.test.ts',
        })

        await logDatasource.saveLog(log);
        const allLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');
        const highLogs = fs.readFileSync(`${logPath}/logs-high.log`, 'utf-8');


        expect(allLogs).toContain(JSON.stringify(log));
        expect(highLogs).toContain(JSON.stringify(log));

    });










})



