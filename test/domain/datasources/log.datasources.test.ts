import { LogDatasource } from "../../../src/domain/datasources/log.datasources";
import { LogEntity, LogSeverityLevel } from "../../../src/domain/entities/log.entities";



describe('log.datasource.ts LogDatasource', () => {

    const newLog = new LogEntity({
        level: LogSeverityLevel.low,
        message: 'test-message',
        origin: 'log.datasource.test.ts',});

    class MockLogDatasource implements LogDatasource {
       async saveLog(log: LogEntity): Promise<void> {
            return ;
        }
        async getLogs(severityLevel: LogSeverityLevel): Promise<LogEntity[]> {
             return [newLog];
        }
        async getLogsDate(date: Date): Promise<LogEntity[]> {
            return [newLog];
        }
        async getLogsSeverityDate(severityLevel: LogSeverityLevel, date: Date): Promise<LogEntity[]> {
            return [newLog];
        }
    }

    test('should  test abstract class', async () => {
        const mockLogDatasource = new MockLogDatasource();
        await mockLogDatasource.saveLog(newLog);
        const logs = await mockLogDatasource.getLogs(LogSeverityLevel.low);

        expect(mockLogDatasource).toBeInstanceOf(MockLogDatasource);
        expect(typeof mockLogDatasource.saveLog).toBe('function');
        expect(typeof mockLogDatasource.getLogs).toBe('function');
        expect(typeof mockLogDatasource.getLogsDate).toBe('function');
        expect(typeof mockLogDatasource.getLogsSeverityDate).toBe('function');
        expect(logs).toHaveLength(1);
        expect(logs[0]).toBeInstanceOf(LogEntity);

    })

})