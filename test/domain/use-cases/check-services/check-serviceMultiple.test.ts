
import { CheckServiceMultiple } from "../../../../src/domain/use-cases/checks/check-service-multiple";
import { LogEntity } from "../../../../src/domain/entities/log.entities";


describe('check.service.ts CheckService use-case', () => {


    const mockRespository1 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
        getLogsDate: jest.fn(),
        getLogsSeverityDate: jest.fn()
    };
    const mockRespository2 = {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
        getLogsDate: jest.fn(),
        getLogsSeverityDate: jest.fn()
    };
    const mockRespository3= {
        saveLog: jest.fn(),
        getLogs: jest.fn(),
        getLogsDate: jest.fn(),
        getLogsSeverityDate: jest.fn()
    };

    const successCallback = jest.fn();
    const errorCallback = jest.fn();
    const checkService = new CheckServiceMultiple(
        [mockRespository1, mockRespository2, mockRespository3], 
        successCallback,
         errorCallback);
    const url = 'https://www.google.com';
    const url2 = 'https://www.11goolle123.com';

    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('should call successCallback when fetch is ok', async () => {

        const res = await checkService.execute(url);
        expect(res).toBeTruthy();
        expect(successCallback).toHaveBeenCalled();
        expect(errorCallback).not.toHaveBeenCalled();
        expect(mockRespository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRespository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRespository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));



    })

    test('should call errorCallback when fetch is not ok', async () => {

        const res = await checkService.execute(url2);
        expect(res).toBeFalsy();
        expect(res).toBe(false);
        expect(successCallback).not.toHaveBeenCalled();
        expect(errorCallback).toHaveBeenCalled();
        expect(mockRespository1.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRespository2.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
        expect(mockRespository3.saveLog).toHaveBeenCalledWith(expect.any(LogEntity));
    })
})

